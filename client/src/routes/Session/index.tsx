import { useState } from 'react';
import Workspace from './Workspace';
import AutoForwarder from './AutoForwarder';
import Error from 'components/Error';
import Loading from 'components/Loading';
import EmailVerification from 'components/EmailVerification';
import { useSessionContext } from 'contexts/SessionContext';
import { useAuthContext } from 'contexts/AuthContext';
import { WorkspaceProvider } from 'contexts/WorkspaceContext';
import useStreamDocuments, {
  CollectionFilter,
} from 'hooks/useStreamDocuments';
import { useHistory } from 'react-router-dom';
import { Endpoint } from 'types/Endpoint';

import styles from './styles.module.css';

const VerifiedWorkspace = ({
  endpoints,
}: {
  endpoints: Endpoint[];
}) => {
  const [docked, setDocked] = useState(false);

  return (
    <WorkspaceProvider endpoints={endpoints}>
      <div className={styles.viewport}>
        <Workspace docked={docked} setDocked={setDocked} />
        <AutoForwarder docked={docked} />
      </div>
    </WorkspaceProvider>
  );
};

const Verified = () => {
  const history = useHistory();
  const { me } = useSessionContext();

  const {
    documents: endpoints,
    error,
    loading,
  } = useStreamDocuments<Endpoint>('endpoints', [
    {
      fieldPath: `users.${me.id}.exists`,
      opStr: '==',
      value: true,
    } as CollectionFilter,
  ]);

  if (error)
    return (
      <div className="super-center">
        <Error message="There was an error refreshing your token. Please log out and log back in.">
          <button
            className="btn btn-primary mt-3"
            onClick={() => history.push('/logout')}
          >
            Log out
          </button>
        </Error>
      </div>
    );

  if (loading || !endpoints) return <Loading />;

  return <VerifiedWorkspace endpoints={endpoints} />;
};

const Unverified = ({ email }: { email: string | null }) => {
  const history = useHistory();
  const { resetAuthState, verifyEmail } = useAuthContext();
  const sendVerification = async (
    onSuccess?: () => void,
    onError?: (message: string) => void,
  ) => {
    const error = await verifyEmail();
    if (error && onError) onError(error.message);
    if (!error && onSuccess) onSuccess();
  };

  return (
    <EmailVerification
      email={email}
      resetAuthState={resetAuthState}
      resendVerification={sendVerification}
      logOut={() => history.push('/logout')}
    />
  );
};

const Session = () => {
  const { me } = useSessionContext();

  return me.emailVerified ? (
    <Verified />
  ) : (
    <Unverified email={me.email} />
  );
};

export default Session;
