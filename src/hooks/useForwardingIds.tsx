import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

const GET_FORWARDING_IDS = gql`
  query getForwardingIds {
    forwardingIds @client
  }
`;

const useForwardingIds = (): {
  forwardingIds: string[];
  addForwardingId: (id: string) => void;
  removeForwardingId: (id: string) => void;
} => {
  const client = useApolloClient();

  const { data } = useQuery<{
    forwardingIds: string[];
  }>(GET_FORWARDING_IDS);

  const addForwardingId = (id: string) =>
    client.writeData({
      data: {
        forwardingIds: data?.forwardingIds.concat(id) ?? [id],
      },
    });

  const removeForwardingId = (id: string) =>
    client.writeData({
      data: {
        forwardingIds:
          data?.forwardingIds.filter(
            forwardingId => forwardingId !== id,
          ) ?? [],
      },
    });

  return {
    forwardingIds: data?.forwardingIds || [],
    addForwardingId,
    removeForwardingId,
  };
};

export default useForwardingIds;
