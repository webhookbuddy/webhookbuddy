import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { useMe } from 'context/user-context';
import Login from 'components/Login';
import Session from 'components/Session';
import Endpoints from 'routes/Endpoints';
import Dashboard from 'routes/Dashboard';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure({
  autoClose: 6000,
});

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
        <Switch>
          <Route
            path="/dashboard/:endpointId"
            component={Dashboard}
          />
          <Route path="/" component={Endpoints} />
        </Switch>
      ) : (
        <Session />
      )}
    </Router>
  );
}

export default App;
