import { gql, useQuery } from '@apollo/client';
import { useMe } from 'context/user-context';
import Login from 'components/Login';
import Register from 'components/Register';
import Session from 'components/Session';
import Viewport from 'routes/Viewport';
import { IsUserLoggedIn } from 'types/IsUserLoggedIn';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
toast.configure({
  autoClose: 6000,
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery<IsUserLoggedIn>(IS_LOGGED_IN);
  const me = useMe();
  return !data || !data.isLoggedIn ? (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  ) : me ? (
    <Viewport />
  ) : (
    <Session />
  );
}

export default App;
