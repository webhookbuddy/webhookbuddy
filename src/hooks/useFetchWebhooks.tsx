import { GET_WEBHOOKS } from 'schema/queries';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { gql, useQuery } from '@apollo/client';
import { GetWebhooks } from 'schema/types/GetWebhooks';
import {
  WebhookCreated,
  WebhookCreatedVariables,
  WebhookCreated_webhookCreated_webhook,
} from './types/WebhookCreated';
import {
  WebhookUpdated,
  WebhookUpdatedVariables,
} from './types/WebhookUpdated';
import {
  WebhooksDeleted,
  WebhooksDeletedVariables,
} from './types/WebhooksDeleted';

const WEBHOOK_CREATED = gql`
  subscription WebhookCreated($endpointId: ID!) {
    webhookCreated(endpointId: $endpointId) {
      webhook {
        ...Webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const WEBHOOK_UPDATED = gql`
  subscription WebhookUpdated($endpointId: ID!) {
    webhookUpdated(endpointId: $endpointId) {
      webhook {
        ...Webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const WEBHOOKS_DELETED = gql`
  subscription WebhooksDeleted($endpointId: ID!) {
    webhooksDeleted(endpointId: $endpointId) {
      webhookIds
    }
  }
`;

const useFetchWebhooks = (endpointId: string) => {
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
    subscribeToMore,
  } = useQuery<GetWebhooks>(GET_WEBHOOKS, {
    variables: {
      endpointId,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const loadMore = () => {
    if (loading) return;
    if (!data?.webhooks.pageInfo.hasNextPage) return;

    return fetchMore({
      variables: {
        after: data?.webhooks.pageInfo.endCursor,
      },
      // @ts-ignore: No overload matches this call error. Can't seem to to get around this error: https://github.com/apollographql/react-apollo/issues/2443#issuecomment-624971593
      updateQuery: (
        previousResult,
        { fetchMoreResult }: { fetchMoreResult: GetWebhooks },
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
            ...fetchMoreResult.webhooks.nodes,
          ],
        },
      }),
    }).catch(() => {}); // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  };

  subscribeToMore<WebhookCreated, WebhookCreatedVariables>({
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
          data: {
            webhookCreated: {
              webhook: WebhookCreated_webhookCreated_webhook;
            };
          };
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

  subscribeToMore<WebhookUpdated, WebhookUpdatedVariables>({
    document: WEBHOOK_UPDATED,
    variables: {
      endpointId,
    },
  });

  subscribeToMore<WebhooksDeleted, WebhooksDeletedVariables>({
    document: WEBHOOKS_DELETED,
    variables: {
      endpointId,
    },
    updateQuery: (
      previousResult,
      {
        subscriptionData,
      }: {
        subscriptionData: {
          data: WebhooksDeleted;
        };
      },
    ) => {
      if (!previousResult || !subscriptionData.data)
        return previousResult;

      const ids = subscriptionData.data.webhooksDeleted.webhookIds;
      return {
        ...previousResult,
        webhooks: {
          ...previousResult.webhooks,
          nodes: previousResult.webhooks.nodes.filter(
            n => !ids.includes(n.id),
          ),
        },
      };
    },
  });

  return {
    webhooks: data?.webhooks.nodes ?? [],
    hasNextPage: data?.webhooks.pageInfo.hasNextPage ?? true,
    loading,
    error,
    refetch,
    loadMore,
  };
};

export default useFetchWebhooks;
