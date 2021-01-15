import { gql, useMutation } from '@apollo/client';
import { GET_WEBHOOKS } from 'schema/queries';
import { WebhooksPayload } from 'schema/types';
import { toast } from 'react-toastify';

const DELETE_WEBHOOKS = gql`
  mutation($input: DeleteWebhooksInput!) {
    deleteWebhooks(input: $input) {
      affectedRows
    }
  }
`;

const useDeleteWebhooks = (endpointId: string) => {
  const [mutate] = useMutation(DELETE_WEBHOOKS, {
    onError: error => toast.error(error.message), // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  });

  const deleteWebhooks = (ids: string[]) => {
    mutate({
      variables: {
        input: {
          ids: ids,
        },
      },
      update: cache => {
        const data = cache.readQuery<WebhooksPayload>({
          query: GET_WEBHOOKS,
          variables: {
            endpointId,
          },
        });

        cache.writeQuery({
          query: GET_WEBHOOKS,
          variables: {
            endpointId,
          },
          data: {
            ...data,
            webhooks: {
              ...data?.webhooks,
              nodes: data?.webhooks.nodes.filter(
                n => !ids.includes(n.id),
              ),
            },
          },
        });
      },
      optimisticResponse: {
        deleteWebhooks: {
          __typename: 'DeleteWebhooksPayload',
          affectedRows: ids.length,
        },
      },
    });
  };

  return {
    deleteWebhooks,
  };
};

export default useDeleteWebhooks;
