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
    isLoggedInVar(isLoggedIn);

    // without setTimeout, can't get the App.tsx's isLoggedIn query to update
    window.setTimeout(async function () {
      await client.clearStore();
      persistor.resume();

      // Even with the setTimeout, isLoggedIn query doesn't update in App.tsx when logging out, so hack a browser reload:
      if (!isLoggedIn) window.location.reload();
    }, 200);
  })();
};
