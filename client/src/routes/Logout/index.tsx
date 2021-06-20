import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';

const Logout = () => {
  const { signOut } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      await signOut();
      history.replace('/');
    })();
  }, [signOut, history]);

  return null;
};

export default Logout;
