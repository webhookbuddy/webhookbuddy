import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { gql, useMutation } from '@apollo/client';
import {
  ReadWebhook,
  ReadWebhookVariables,
  ReadWebhook_readWebhook_webhook,
} from './types/ReadWebhook';

const READ_WEBHOOK = gql`
  mutation ReadWebhook($input: ReadWebhookInput!) {
    readWebhook(input: $input) {
      webhook {
        ...Webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const useReadWebhook = () => {
  const [mutate] = useMutation<ReadWebhook, ReadWebhookVariables>(
    READ_WEBHOOK,
  );

  const readWebhook = (webhook: ReadWebhook_readWebhook_webhook) => {
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
