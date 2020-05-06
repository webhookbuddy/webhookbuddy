import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useMe } from 'context/user-context';
import Login from 'components/Login';
import Session from 'components/Session';
import Endpoints from 'routes/Endpoints';
import Dashboard from 'routes/Dashboard';

import './App.css';

const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);
  const me = useMe();
  return (
    <Router>
      {!data || !data.isLoggedIn ? (
        <Login />
      ) : me ? (
        <>
          <Route exact path="/" component={Endpoints} />
          <Route
            path="/endpoints/:endpointId"
            component={Dashboard}
          />
        </>
      ) : (
        <Session />
      )}
    </Router>
  );
}

export default App;
