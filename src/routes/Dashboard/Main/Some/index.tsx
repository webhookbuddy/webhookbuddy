import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from 'components/Jumbotron';
import { useApolloClient } from '@apollo/react-hooks';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { Webhook, KeyValue } from 'schema/types';
import Forwarder from './Forwarder';
import Tabs from './Tabs';
import Body from './Body';
import None from '../None';
const { ipcRenderer } = window.require('electron');

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

const Some = () => {
  useEffect(() => {
    const onForwardedListener = (
      _: any,
      {
        reference,
        webhook,
        headers,
        statusCode,
        data,
      }: {
        reference: any;
        webhook: Webhook;
        headers: any;
        statusCode: number;
        data: string;
      },
    ) => {
      console.log(
        webhook.id,
        webhook.method,
        headers,
        statusCode,
        data,
      );
    };

    ipcRenderer.on('http-request-completed', onForwardedListener);

    return () => {
      ipcRenderer.removeListener(
        'http-request-completed',
        onForwardedListener,
      );
    };
  }, []);

  const { webhookIds } = useParams<{ webhookIds: string }>();
  const ids = webhookIds.split(',');
  const client = useApolloClient();
  const webhooks = ids
    .map(id =>
      client.readFragment<Webhook>({
        id: `Webhook:${id}`,
        fragment: WEBHOOK_FRAGMENT,
        fragmentName: 'webhook',
      }),
    )
    // These can be nulls if page is being loaded and webhooks aren't in the cache yet.
    // We will minimize this problem in the future by using `apollo-cache-persist`.
    .filter(w => !!w) as Webhook[];

  const forwardTo = (url: string) => {
    webhooks.forEach(webhook => {
      ipcRenderer.send('http-request', {
        url: appendQuery(url, webhook.query),
        webhook,
        reference: {
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
