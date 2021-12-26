import { useParams } from 'react-router-dom';
import { Endpoint } from 'types/Endpoint';
import useStreamDocument from 'hooks/useStreamDocument';
import { useSessionContext } from 'contexts/SessionContext';
import Invite from './Invite';

const Team = () => {
  const { id } = useParams<{ id: string }>();
  const { me } = useSessionContext();
  const { document: endpoint } = useStreamDocument<Endpoint>(
    'endpoints',
    id,
  );

  return (
    <>
      {endpoint && endpoint.users[me.id].role === 'Owner' && (
        <Invite endpoint={endpoint} />
      )}
      <h2 className="mt-4">Pending Invites</h2>
      <h2 className="mt-4">Team</h2>
    </>
  );
};

export default Team;
