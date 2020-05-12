import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from 'components/Jumbotron';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { Webhook, KeyValue, Forward } from 'schema/types';
import Forwarder from './Forwarder';
import Tabs from './Tabs';
import Body from './Body';
import None from '../None';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import useForwardingIds from 'hooks/useForwardingIds';
const { ipcRenderer } = window.require('electron');

const ADD_FORWARD = gql`
  mutation($input: AddForwardInput!) {
    addForward(input: $input) {
      webhook {
        ...webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const extractContentType = (headers: KeyValue[]) =>
  headers.find(header => header.key.toLowerCase() === 'content-type')
    ?.value ?? null;

const queryString = (query: KeyValue[]) =>
  query
    .map(pair => `${pair.key}=${encodeURIComponent(pair.value)}`)
    .join('&');

const appendQuery = (url: string, query: KeyValue[]) =>
  !query.length
    ? url
    : url.includes('?')
    ? `${url}&${queryString(query)}`
    : `${url}?${queryString(query)}`;

const mapHeaders = (rawHeaders: string[]) => {
  const headers = [];
  for (let i = 0; i < rawHeaders.length; i = i + 2)
    headers.push({
      __typename: 'KeyValue',
      key: rawHeaders[i],
      value: rawHeaders[i + 1],
    });

  return headers;
};

const Some = () => {
  const { addForwardingId, removeForwardingId } = useForwardingIds();
  const [addForward] = useMutation(ADD_FORWARD);

  useEffect(() => {
    const onForwardedListener = (
      _: any,
      {
        metadata,
        webhook,
        rawHeaders,
        statusCode,
        data,
      }: {
        metadata: { url: string };
        webhook: Webhook;
        statusCode: number;
        rawHeaders: string[];
        data: string;
      },
    ) => {
      const forward = {
        __typename: 'Forward',
        id: '_' + Math.round(Math.random() * 1000000),
        url: metadata.url,
        statusCode,
        success: statusCode >= 200 && statusCode < 300,
        createdAt: new Date(),
        method: webhook.method,
        headers: mapHeaders(rawHeaders),
        query: webhook.query,
        contentType: extractContentType(mapHeaders(rawHeaders)),
        body: data,
      } as Forward;

      addForward({
        variables: {
          input: {
            webhookId: webhook.id,
            url: forward.url,
            method: forward.method,
            statusCode: forward.statusCode,
            // need to remap here b/c server rejects __typename property
            headers: forward.headers.map(kv => ({
              key: kv.key,
              value: kv.value,
            })),
            // need to remap here b/c server rejects __typename property
            query: forward.query.map(kv => ({
              key: kv.key,
              value: kv.value,
            })),
            body: forward.body,
          },
        },
        optimisticResponse: {
          addForward: {
            __typename: 'AddForwardPayload',
            webhook: {
              __typename: 'Webhook',
              ...webhook,
              forwards: [forward, ...webhook.forwards],
            },
          },
        },
      }).catch(error => toast.error(error.message));

      removeForwardingId(webhook.id);
    };

    ipcRenderer.on('http-request-completed', onForwardedListener);

    return () => {
      ipcRenderer.removeListener(
        'http-request-completed',
        onForwardedListener,
      );
    };
  }, [addForward, removeForwardingId]);

  const { webhookIds } = useParams<{ webhookIds: string }>();
  const ids = webhookIds.split(',');
  const client = useApolloClient();
  const webhooks = ids
    .map(id =>
      client.readFragment<Webhook>(
        {
          id: `Webhook:${id}`,
          fragment: WEBHOOK_FRAGMENT,
          fragmentName: 'webhook',
        },
        true, // TODO: optimistic true doesn't seem to work
      ),
    )
    // These can be nulls if page is being loaded and webhooks aren't in the cache yet.
    // We will minimize this problem in the future by using `apollo-cache-persist`.
    .filter(w => !!w) as Webhook[];

  const forwardTo = (url: string) => {
    webhooks.forEach(webhook => {
      addForwardingId(webhook.id);
      ipcRenderer.send('http-request', {
        url: appendQuery(url, webhook.query),
        webhook,
        metadata: {
          url,
        },
      });
    });
  };

  return (
    <>
      {webhooks.length === 0 ? (
        <None />
      ) : webhooks.length === 1 ? (
        <>
          <Forwarder forwardTo={forwardTo} />
          <Tabs />
          <Body webhook={webhooks[0]} />
        </>
      ) : (
        <>
          <Forwarder forwardTo={forwardTo} />
          <Jumbotron>
            <div className="text-center">
              Multiple webhooks selected. Forward them all using the{' '}
              <strong>
                <em>Play</em>
              </strong>{' '}
              option above.
            </div>
          </Jumbotron>
        </>
      )}
    </>
  );
};

export default Some;
