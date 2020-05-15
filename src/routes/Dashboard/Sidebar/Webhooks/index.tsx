import React from 'react';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Item from './Item';
import { WebhookConnection, Webhook } from 'schema/types';
import moment from 'moment';

const GET_WEBHOOKS = gql`
  query getWebhooks($endpointId: ID!, $after: Int) {
    webhooks(endpointId: $endpointId, after: $after)
      @connection(key: "webhooks", filter: ["endpointId"]) {
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

const WEBHOOK_CREATED = gql`
  subscription webhookCreated($endpointId: ID!) {
    webhookCreated(endpointId: $endpointId) {
      webhook {
        ...webhook
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
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
    subscribeToMore,
  } = useQuery<WebhooksPayload>(GET_WEBHOOKS, {
    variables: {
      endpointId,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: data => loadMore(data),
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = (data: WebhooksPayload) => {
    /*
    TODO: fix the double load problem described below:

    There is a race condition problem which results in the query with the same variables being called twice.
    It goes like this:
    useQuery's onCompleted: data.pageInfo.endCursor === 20
    fetchMore's updateQuery: fetchMoreResult.pageInfo.endCursor === 15
    useQuery's onCompleted: data.pageInfo.endCursor === 20 (not good, should be 15)
    fetchMore's updateQuery: fetchMoreResult.pageInfo.endCursor === 15
    useQuery's onCompleted: data.pageInfo.endCursor === 15 (this is good, but it should have been 15 last time)
    fetchMore's updateQuery: fetchMoreResult.pageInfo.endCursor === 10
    useQuery's onCompleted: data.pageInfo.endCursor === 15 (not good, should be 15)
    fetchMore's updateQuery: fetchMoreResult.pageInfo.endCursor === 10
    useQuery's onCompleted: data.pageInfo.endCursor === 10  (this is good, but it should have been 10 last time)

    There's also a question of how onCompleted is being called after fetchMore, as I did some isolated tests with new React projects
    where that wasn't the case.

    For now, the workaround is the ensure double entries aren't returned from FetchMore's updateQuery
    */

    if (!data?.webhooks.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: data?.webhooks.pageInfo.endCursor,
      },
      // @ts-ignore: No overload matches this call error. Can't seem to to get around this error: https://github.com/apollographql/react-apollo/issues/2443#issuecomment-624971593
      updateQuery: (
        previousResult,
        { fetchMoreResult }: { fetchMoreResult: WebhooksPayload },
      ) => ({
        ...previousResult,
        webhooks: {
          ...previousResult.webhooks,
          pageInfo: {
            ...previousResult.webhooks.pageInfo,
            endCursor: fetchMoreResult?.webhooks.pageInfo.endCursor,
            hasNextPage:
              fetchMoreResult?.webhooks.pageInfo.hasNextPage,
          },
          nodes: [
            ...previousResult.webhooks.nodes,

            // See comment above about race condition
            ...fetchMoreResult.webhooks.nodes.filter(
              n =>
                !previousResult.webhooks.nodes.some(
                  p => p.id === n.id,
                ),
            ),
          ],
        },
      }),
    });
  };

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  subscribeToMore({
    document: WEBHOOK_CREATED,
    variables: {
      endpointId,
    },
    updateQuery: (
      previousResult,
      {
        subscriptionData,
      }: {
        subscriptionData: {
          data: { webhookCreated: { webhook: Webhook } };
        };
      },
    ) => {
      if (!previousResult || !subscriptionData.data)
        return previousResult;

      const webhook = subscriptionData.data.webhookCreated.webhook;
      if (
        previousResult.webhooks.nodes.some(w => w.id === webhook.id)
      )
        return previousResult;
      else
        return {
          ...previousResult,
          webhooks: {
            ...previousResult.webhooks,
            nodes: [webhook, ...previousResult.webhooks.nodes],
          },
        };
    },
  });

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
