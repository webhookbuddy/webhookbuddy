import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import {
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import {
  PersistedData,
  PersistentStorage,
} from 'apollo-cache-persist/types';
import localForage from 'localforage';
import { getMainDefinition } from 'apollo-utilities';

import { typeDefs, resolvers } from 'schema/resolvers';

import { UserProvider } from 'context/user-context';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('x-token'),
    forwardingIds: [],
  },
});

const waitOnCache = persistCache({
  cache,
  storage: localForage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >,
});

const httpLink = new HttpLink({
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
        cache.writeData({
          data: {
            isLoggedIn: false,
          },
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
