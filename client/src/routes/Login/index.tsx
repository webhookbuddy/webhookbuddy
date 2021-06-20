import { SyntheticEvent, useState } from 'react';
import FormLayout, { FormAlignment } from 'components/FormLayout';
import { Link } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';

const Login = () => {
  const { signIn } = useAuthContext();

  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
  }>({ loading: false, error: undefined });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setState({ loading: true, error: undefined });
    const error = await signIn(email, password);
    if (error)
      setState({
        loading: false,
        error:
          error.code === 'auth/user-not-found'
            ? 'Wrong email or password.'
            : error.code === 'auth/wrong-password'
            ? 'Wrong email or password.'
            : error.message,
      });
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
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={state.loading}
          >
            Log in
          </button>
        </div>
        Forgot your password?{' '}
        <Link to="/resetpassword">Reset password</Link>
        <br />
        Don't have an account? <Link to="/register">Register</Link>
      </form>
    </FormLayout>
  );
};

export default Login;
