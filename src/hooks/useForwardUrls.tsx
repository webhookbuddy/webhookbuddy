import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { distinct } from 'services/ids';

const GET_FORWARD_URLS = gql`
  query getForwardUrls {
    forwardUrls @client
  }
`;

const useForwardUrls = () => {
  const client = useApolloClient();

  const { data } = useQuery<{
    forwardUrls: string[];
  }>(GET_FORWARD_URLS);

  const addForwardUrl = (url: string) =>
    client.writeData({
      data: {
        forwardUrls: distinct(
          [url].concat(data?.forwardUrls ?? []),
        ).slice(0, 8),
      },
    });

  return {
    forwardUrls: data?.forwardUrls || [],
    addForwardUrl,
  };
};

export default useForwardUrls;
