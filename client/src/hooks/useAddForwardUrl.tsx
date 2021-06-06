import { useMutation } from '@apollo/client';
import { ADD_FORWARD_URL, GET_FORWARD_URLS } from 'schema/queries';
import {
  AddForwardUrl,
  AddForwardUrlVariables,
} from 'schema/types/AddForwardUrl';
import {
  GetForwardUrls,
  GetForwardUrlsVariables,
} from 'schema/types/GetForwardUrls';

const useAddForwardUrl = (endpointId: string) => {
  const [mutate] = useMutation<AddForwardUrl, AddForwardUrlVariables>(
    ADD_FORWARD_URL,
    {
      onError: () => {}, // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
    },
  );

  const addForwardUrl = (url: string) =>
    mutate({
      variables: {
        input: {
          endpointId,
          url,
        },
      },
      update: (cache, { data }) => {
        const forwardUrl = data?.addForwardUrl.forwardUrl;
        if (!forwardUrl) return;

        const forwardUrlsData = cache.readQuery<
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
            ...forwardUrlsData,
            forwardUrls: [
              forwardUrl,
              ...(forwardUrlsData?.forwardUrls ?? []),
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

  return { addForwardUrl };
};

export default useAddForwardUrl;
