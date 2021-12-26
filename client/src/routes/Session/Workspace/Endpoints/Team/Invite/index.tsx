import FormLayout, { FormAlignment } from 'components/FormLayout';
import { SyntheticEvent, useState } from 'react';
import { Endpoint } from 'types/Endpoint';
import useSetDocument from 'hooks/useSetDocument';
import { useSessionContext } from 'contexts/SessionContext';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';

const Invite = ({ endpoint }: { endpoint: Endpoint }) => {
  const { me } = useSessionContext();

  const { setDocument: setInvite } = useSetDocument(
    `endpoints/${endpoint.id}/invites`,
  );

  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
  }>({ loading: false, error: undefined });

  const [email, setEmail] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const lowerEmail = email.toLocaleLowerCase().trim();
    setState({ loading: true, error: undefined });
    setInvite(
      lowerEmail,
      {
        accepted: false,
        resendCount: 0,
        invitee: {
          email: lowerEmail,
        },
        inviter: {
          id: me.id,
          email: me.email,
          firstName: me.firstName,
          lastName: me.lastName,
        },
        createdAt: serverTimestamp(),
      },
      message => setState({ loading: false, error: message }),
      () => {
        setState({ loading: false, error: undefined });
        toast.info(`Invitation will soon be sent to ${lowerEmail}.`);
        setEmail('');
      },
    );
  };

  return (
    <FormLayout
      alignment={FormAlignment.CenterX}
      loading={state.loading}
      error={state.error}
    >
      <h2>Invite Team Member</h2>
      <p>
        Your team will be able to see webhooks and forwards related to
        your <strong>{endpoint.name}</strong> endpoint.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Send Invitation
        </button>
      </form>
    </FormLayout>
  );
};

export default Invite;
