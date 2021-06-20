import { SyntheticEvent, useState } from 'react';
import FormLayout, { FormAlignment } from 'components/FormLayout';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { resetPassword } = useAuthContext();
  const history = useHistory();

  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
  }>({ loading: false, error: undefined });

  const [email, setEmail] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setState({ loading: true, error: undefined });
    const error = await resetPassword(email);
    if (error)
      setState({
        loading: false,
        error:
          error.code === 'auth/user-not-found'
            ? 'Email not found!'
            : error.message,
      });
    else {
      toast.success('Password reset request sent to your email.');
      history.push('/');
    }
  };

  return (
    <FormLayout
      alignment={FormAlignment.CenterXY}
      loading={state.loading}
      error={state.error}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={state.loading}
          >
            Reset password
          </button>
        </div>
        Don't need to reset your password?{' '}
        <Link to="/login">Log in</Link>
      </form>
    </FormLayout>
  );
};

export default ResetPassword;
