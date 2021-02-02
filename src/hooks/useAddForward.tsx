import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { AddForward, AddForwardVariables } from './types/AddForward';

const ADD_FORWARD = gql`
  mutation AddForward($input: AddForwardInput!) {
    addForward(input: $input) {
      webhook {
        ...Webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const useAddForward = () => {
  const [addForward] = useMutation<AddForward, AddForwardVariables>(
    ADD_FORWARD,
    {
      onError: error => toast.error(error.message), // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
    },
  );
  return { addForward };
};

export default useAddForward;
