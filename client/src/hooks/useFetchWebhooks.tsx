import { GET_WEBHOOKS,
  WEBHOOKS_DELETED,
  WEBHOOK_CREATED,
  WEBHOOK_UPDATED } from 'schema/queries';
import { useQuery } from '@apollo/client';
import {
  GetWebhooks,
  GetWebhooksVariables,
} from 'schema/types/GetWebhooks';
import {
  WebhookCreated,
  WebhookCreatedVariables,
} from 'schema/types/WebhookCreated';
import {
  WebhookUpdated,
  WebhookUpdatedVariables,
} from 'schema/types/WebhookUpdated';
import {
  WebhooksDeleted,
  WebhooksDeletedVariables,
} from 'schema/types/WebhooksDeleted';

const useFetchWebhooks = (endpointId: string) => {
  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
    subscribeToMore,
  } = useQuery<GetWebhooks, GetWebhooksVariables>(GET_WEBHOOKS, {
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
          data: WebhookCreated;
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
