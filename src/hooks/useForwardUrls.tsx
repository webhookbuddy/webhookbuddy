import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ForwardUrlPayload } from 'schema/types';
import { distinct } from 'services/ids';

const FORWARD_URL_FRAGMENT = gql`
  fragment forwardUrl on ForwardUrl {
    url
  }
`;

const GET_FORWARD_URLS = gql`
  query getForwardUrls($endpointId: ID!) {
    forwardUrls(endpointId: $endpointId) {
      ...forwardUrl
    }
  }
  ${FORWARD_URL_FRAGMENT}
`;

const ADD_FORWARD_URL = gql`
  mutation($input: AddForwardUrlInput!) {
    addForwardUrl(input: $input) {
      forwardUrl {
        ...forwardUrl
      }
    }
  }
  ${FORWARD_URL_FRAGMENT}
`;

const useForwardUrls = (endpointId: string) => {
  const { data } = useQuery<ForwardUrlPayload>(GET_FORWARD_URLS, {
    variables: {
      endpointId,
    },
  });

  const [mutate] = useMutation(ADD_FORWARD_URL);

  const addForwardUrl = (url: string) =>
    mutate({
      variables: {
        input: {
          endpointId,
          url,
        },
      },
      update: (
        cache,
        {
          data: {
            addForwardUrl: { forwardUrl },
          },
        },
      ) => {
        const data = cache.readQuery<ForwardUrlPayload>({
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
            ...data,
            forwardUrls: [forwardUrl, ...(data?.forwardUrls ?? [])],
          },
        });
      },
      optimisticResponse: {
        addForwardUrl: {
          __typename: 'AddForwardUrlPayload',
          forwardUrl: { url, __typename: 'ForwardUrl' },
        },
      },
    }).catch(() => {});

  return {
    forwardUrls: distinct(data?.forwardUrls.map(f => f.url) || []),
    addForwardUrl,
  };
};

export default useForwardUrls;
