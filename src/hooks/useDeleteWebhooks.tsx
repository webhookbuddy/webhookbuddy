import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
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
  const [mutate] = useMutation(DELETE_WEBHOOKS);

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
    }).catch(error => toast.error(error.message));
  };

  return {
    deleteWebhooks,
  };
};

export default useDeleteWebhooks;
