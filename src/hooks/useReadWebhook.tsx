import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { gql, useMutation } from '@apollo/client';
import { Webhook } from 'schema/types';

const READ_WEBHOOK = gql`
  mutation($input: ReadWebhookInput!) {
    readWebhook(input: $input) {
      webhook {
        ...webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const useReadWebhook = () => {
  const [mutate] = useMutation(READ_WEBHOOK);

  const readWebhook = (webhook: Webhook) => {
    mutate({
      variables: {
        input: {
          id: webhook.id,
        },
      },
      optimisticResponse: {
        readWebhook: {
          __typename: 'ReadWebhookPayload',
          webhook: {
            __typename: 'Webhook',
            ...webhook,
            read: true,
          },
        },
      },
    });
  };

  return {
    readWebhook,
  };
};

export default useReadWebhook;
