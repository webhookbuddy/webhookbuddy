import React from 'react';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Item from './Item';
import { WebhookConnection } from 'schema/types';
import moment from 'moment';

const GET_WEBHOOKS = gql`
  query getWebhooks($endpointId: ID!, $after: Int) {
    webhooks(endpointId: $endpointId, after: $after) {
      nodes {
        ...webhook
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

interface WebhooksPayload {
  webhooks: WebhookConnection;
}

const Webhooks = () => {
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();
  const { data, loading, error, refetch, fetchMore } = useQuery<
    WebhooksPayload
  >(GET_WEBHOOKS, {
    variables: {
      endpointId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  return (
    <div className="webhooks">
      {data?.webhooks.nodes.map(webhook => (
        <Item
          key={webhook.id}
          id={webhook.id}
          label={`${webhook.method}: ${moment(
            webhook.createdAt,
          ).format('LLL')}`}
          isActive={false} // TODO
          isUnread={!webhook.read}
          forwardSuccessCount={
            webhook.forwards.filter(f => f.success).length
          }
          forwardErrorCount={
            webhook.forwards.filter(f => !f.success).length
          }
        />
      ))}
      {loading ? (
        <Loading />
      ) : (
        error && (
          <Error error={error}>
            <button className="btn btn-primary" onClick={retry}>
              Try again!
            </button>
          </Error>
        )
      )}
    </div>
  );
};

export default Webhooks;
