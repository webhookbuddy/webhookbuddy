import { gql, useQuery, useApolloClient } from '@apollo/client';

const GET_FORWARDING_IDS = gql`
  query getForwardingIds {
    forwardingIds @client
  }
`;

const useForwardingIds = (): {
  forwardingIds: string[];
  addForwardingIds: (ids: string[]) => void;
  removeForwardingId: (id: string) => void;
} => {
  const client = useApolloClient();

  const { data } = useQuery<{
    forwardingIds: string[];
  }>(GET_FORWARDING_IDS);

  const addForwardingIds = (ids: string[]) =>
    client.writeData({
      data: {
        forwardingIds: data?.forwardingIds.concat(ids) ?? ids,
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
    addForwardingIds,
    removeForwardingId,
  };
};

export default useForwardingIds;
