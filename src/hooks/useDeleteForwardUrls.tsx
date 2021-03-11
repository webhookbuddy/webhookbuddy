import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  AddForwardUrl,
  AddForwardUrlVariables,
} from './types/AddForwardUrl';
import { ForwardUrl } from './types/ForwardUrl';
import {
  GetForwardUrls,
  GetForwardUrlsVariables,
} from './types/GetForwardUrls';

const DELETE_FORWARD_URLS = gql`
  mutation DeleteForwardUrls($input: DeleteForwardUrlInput!) {
    deleteForwardUrls(input: $input) {
      affectedRows
    }
  }
`;

const GET_FORWARD_URLS = gql`
  query GetForwardUrls($endpointId: ID!) {
    forwardUrls(endpointId: $endpointId) {
      url
      endpointId
      createdAt
      id
    }
  }
`;

const useDeleteForwardUrls = (endpointId: string) => {
  const { data } = useQuery<GetForwardUrls, GetForwardUrlsVariables>(
    GET_FORWARD_URLS,
    {
      variables: {
        endpointId,
      },
    },
  );

  console.log(data);

  const [mutate] = useMutation<AddForwardUrl, AddForwardUrlVariables>(
    DELETE_FORWARD_URLS,
    {
      onError: error => toast.error(error.message), // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
    },
  );

  const deleteForwardUrls = (url: string) => {
    mutate({
      variables: {
        input: {
          endpointId,
          url: url,
        },
      },
    });
  };

  return {
    deleteForwardUrls,
  };
};

export default useDeleteForwardUrls;
