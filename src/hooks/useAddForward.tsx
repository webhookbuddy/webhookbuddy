import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { AddForward, AddForwardVariables } from 'schema/types/AddForward';
import { ADD_FORWARD } from 'schema/queries';

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
