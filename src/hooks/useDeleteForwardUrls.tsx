import { gql, useMutation } from '@apollo/client';
import {
  AddForwardUrl,
  AddForwardUrlVariables,
} from './types/AddForwardUrl';
import {
  GetForwardUrls,
  GetForwardUrlsVariables,
} from './types/GetForwardUrls';

<<<<<<< HEAD
import { GET_FORWARD_URLS } from './useFetchForwardUrls';
=======
const FORWARD_URL_FRAGMENT = gql`
  fragment ForwardUrl on ForwardUrl {
    url
  }
`;
>>>>>>> 5ea813c27a18367c5e60679e5711802ebf4d1313

const DELETE_FORWARD_URLS = gql`
  mutation DeleteForwardUrls($input: DeleteForwardUrlInput!) {
    deleteForwardUrls(input: $input) {
      affectedRows
    }
  }
`;

<<<<<<< HEAD
=======
const GET_FORWARD_URLS = gql`
  query GetForwardUrls($endpointId: ID!) {
    forwardUrls(endpointId: $endpointId) {
      ...ForwardUrl
    }
  }
  ${FORWARD_URL_FRAGMENT}
`;

>>>>>>> 5ea813c27a18367c5e60679e5711802ebf4d1313
const useDeleteForwardUrls = (endpointId: string) => {
  const [mutate] = useMutation<AddForwardUrl, AddForwardUrlVariables>(
    DELETE_FORWARD_URLS,
    {
      onError: () => {}, // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
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
      update: (cache, { data }) => {
        const forwardUrl = data?.addForwardUrl.forwardUrl;
        if (!forwardUrl) return;

        const forwardUrlData = cache.readQuery<
          GetForwardUrls,
          GetForwardUrlsVariables
        >({
          query: GET_FORWARD_URLS,
          variables: {
            endpointId,
          },
        });
        cache.writeQuery({
          query: GET_FORWARD_URLS,
          variables: {
            endpointId,
          },
          data: {
            ...forwardUrlData,
            forwardUrls: [
              forwardUrlData?.forwardUrls.filter(
                n => !forwardUrl.url.includes(n.url),
              ) || [],
            ],
          },
        });
      },
      optimisticResponse: {
        addForwardUrl: {
          __typename: 'AddForwardUrlPayload',
          forwardUrl: { url, __typename: 'ForwardUrl' },
        },
      },
    });
  };

  return {
    deleteForwardUrls,
  };
};

export default useDeleteForwardUrls;
