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

const Some = () => {
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
    .filter(wh => !!wh) as Webhook[];

  return (
    <>
      {webhooks.length === 0 ? (
        <None />
      ) : webhooks.length === 1 ? (
        <>
          <Forwarder />
          <Tabs />
          <Body webhook={webhooks[0]} />
        </>
      ) : (
        <>
          <Forwarder />
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
