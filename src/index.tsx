import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  createHttpLink,
  split,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import {
  persistCache,
  PersistentStorage,
} from 'apollo3-cache-persist';
import localForage from 'localforage';

import { typeDefs, resolvers } from 'schema/resolvers';

import { UserProvider } from 'context/user-context';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read: () => !!localStorage.getItem('x-token'),
        },
        endpoints: {
          // Without this, we get a `Cache data may be lost when replacing the endpoints field of a Query object.` warning. More info: https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
          merge: (_, incoming) => incoming,
        },
      },
    },
  },
});

const waitOnCache = persistCache({
  cache,
  storage: localForage as PersistentStorage,
});

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_API_ORIGIN}/graphql`,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-token': localStorage.getItem('x-token') || '',
  },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (
        err.extensions &&
        (err.extensions.code === 'UNAUTHENTICATED' ||
          err.extensions.code === 'FORBIDDEN')
      ) {
        localStorage.removeItem('x-token');
        // https://stackoverflow.com/a/53844411/188740
        // Calling resetStore without calling clearStore first will result in all queries being refetched without an x-token header.
        // We need resetStore b/c calling cache.modify from clearStore's promise resolver doesn't broadcast changes to re-query isLoggedIn in App.tsx
        client.clearStore().then(() => {
          client.resetStore().then(() => {
            client.cache.modify({
              fields: {
                isLoggedIn: () => false,
              },
            });
          });
        });
      } else if (err.extensions)
        console.log(`${err.extensions?.code} error`);
    }
  }

  if (networkError) console.log('networkError', networkError);
});

const httpWithErrorLink = ApolloLink.from([
  errorLink,
  authLink,
  httpLink,
]);

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_WS_ORIGIN}/graphql`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      'x-token': localStorage.getItem('x-token') || '',
    }),
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink, // route here for subscription operations
  httpWithErrorLink, // route here for everything else (e.g. query and mutation)
);

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
});

waitOnCache.then(() => {
  ReactDOM.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <UserProvider>
          <App />
        </UserProvider>
      </ApolloProvider>
    </StrictMode>,
    document.getElementById('root'),
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
