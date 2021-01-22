import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { gql, useMutation } from '@apollo/client';
import { useMe } from 'context/user-context';
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
  const me = useMe();

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
            reads: webhook.reads.concat({
              __typename: 'Read',
              reader: {
                __typename: 'User',
                id: me?.id ?? '0',
              },
            }),
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
