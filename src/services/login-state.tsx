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

    // Without setTimeout, App.tsx's isLoggedIn query doesn't update, so login form will temporarily display after logging in
    window.setTimeout(async function () {
      await client.clearStore();
      persistor.resume();

      // Logging out: isLoggedIn query doesn't update in App.tsx, so hack a browser reload
      // Loggin in: onCompleted hook in <Session />'s useQuery<GetMe> doesn't get called when using production api (at api.webhookbuddy.com/graphql), so hack a browser reload
      window.location.reload();
    }, 200);
  })();
};
