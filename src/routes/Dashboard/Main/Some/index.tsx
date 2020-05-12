import React from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from 'components/Jumbotron';
import { useApolloClient } from '@apollo/react-hooks';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { Webhook } from 'schema/types';
import Forwarder from './Forwarder';
import Tabs from './Tabs';
import Body from './Body';
import None from '../None';
import useForwarder from 'hooks/useForwarder';

const Some = () => {
  const { forwardWebhook } = useForwarder();

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

  const forwardTo = (url: string) => forwardWebhook(url, webhooks);

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
