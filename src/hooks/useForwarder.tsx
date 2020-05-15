import { Webhook, KeyValue, Forward } from 'schema/types';
import gql from 'graphql-tag';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { useEffect } from 'react';
import useForwardingIds from './useForwardingIds';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import useForwardUrls from './useForwardUrls';

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

const extractContentType = (headers: KeyValue[]) =>
  headers.find(header => header.key.toLowerCase() === 'content-type')
    ?.value ?? null;

const useForwarder = () => {
  const { addForwardingId, removeForwardingId } = useForwardingIds();
  const { addForwardUrl } = useForwardUrls();
  const [addForward] = useMutation(ADD_FORWARD);

  useEffect(() => {
    const onForwardedListener = (
      _: any,
      {
        metadata,
        rawHeaders,
        statusCode,
        data,
      }: {
        metadata: { url: string; webhook: Webhook };
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
        method: metadata.webhook.method,
        headers: mapHeaders(rawHeaders),
        query: metadata.webhook.query,
        contentType: extractContentType(mapHeaders(rawHeaders)),
        body: data,
      } as Forward;
      removeForwardingId(metadata.webhook.id);
      addForward({
        variables: {
          input: {
            webhookId: metadata.webhook.id,
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
              ...metadata.webhook,
              forwards: [forward, ...metadata.webhook.forwards],
            },
          },
        },
      }).catch(error => toast.error(error.message));
    };

    ipcRenderer.on('http-request-completed', onForwardedListener);

    return () => {
      ipcRenderer.removeListener(
        'http-request-completed',
        onForwardedListener,
      );
    };
  }, [removeForwardingId, addForward]);

  const forwardWebhook = (url: string, webhooks: Webhook[]) => {
    addForwardUrl(url);
    webhooks.forEach(webhook => {
      addForwardingId(webhook.id);
      ipcRenderer.send('http-request', {
        method: webhook.method,
        url: appendQuery(url, webhook.query),
        headers: webhook.headers
          .filter(header => header.key.toLowerCase() !== 'host')
          .reduce((acc, cur) => {
            acc[cur.key] = cur.value;
            return acc;
          }, {} as any),
        body: webhook.body,
        metadata: {
          url,
          webhook,
        },
      });
    });
  };

  return {
    forwardWebhook,
  };
};

export default useForwarder;
