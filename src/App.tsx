import { useQuery } from '@apollo/client';
import { useMe } from 'context/user-context';
import Login from 'components/Login';
import Session from 'components/Session';
import Viewport from 'routes/Viewport';
import { IsUserLoggedIn } from 'types/IsUserLoggedIn';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { IS_LOGGED_IN } from 'schema/queries';
toast.configure({
  autoClose: 6000,
});

function App() {
  const { data } = useQuery<IsUserLoggedIn>(IS_LOGGED_IN);
  const me = useMe();
  return !data || !data.isLoggedIn ? (
    <Login />
  ) : me ? (
    <Viewport />
  ) : (
    <Session />
  );
}

export default App;
