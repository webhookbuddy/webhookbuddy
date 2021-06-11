import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthProvider, useAuthContext } from 'contexts/AuthContext';
import { SessionProvider } from 'contexts/SessionContext';
import Login from 'routes/Login';
import Logout from 'routes/Logout';
import ResetPassword from 'routes/ResetPassword';
import Register from 'routes/Register';
import Session from 'routes/Session';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

toast.configure({
  autoClose: 6000,
});

function AppSession() {
  const { me } = useAuthContext();
  return me === undefined ? (
    <Loading />
  ) : me === null ? (
    <Login />
  ) : (
    <SessionProvider me={me}>
      <Session />
    </SessionProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/resetpassword">
            <ResetPassword />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <AppSession />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
