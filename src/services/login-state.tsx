import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { CachePersistor } from 'apollo3-cache-persist';
import { isLoggedInVar } from 'cache';

export const changeLoginState = (
  client: ApolloClient<object>,
  persistor: CachePersistor<NormalizedCacheObject>,
  isLoggedIn: boolean,
) => {
  (async function () {
    // Quite complicated to reset cache: https://github.com/apollographql/apollo-cache-persist/issues/34
    persistor.pause();
    persistor.purge();
    await client.clearStore();
    isLoggedInVar(isLoggedIn);
    persistor.resume();
  })();
};
