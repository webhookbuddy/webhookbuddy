import { FormEvent, useState } from 'react';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

import { ApolloError, MutationFunctionOptions } from '@apollo/client';
import { ExecutionResult } from 'graphql';
import {
  Login as LoginPayload,
  LoginVariables,
} from 'schema/types/Login';

const LoginForm = ({
  loginUser,
  loading,
  error,
}: {
  loginUser: (
    options?:
      | MutationFunctionOptions<LoginPayload, LoginVariables>
      | undefined,
  ) => Promise<ExecutionResult<LoginPayload>>;
  loading: boolean;
  error: ApolloError | undefined;
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {error && <Error error={error} />}
        {loading ? (
          <Loading />
        ) : (
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
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
            <br />
            Do not have an account?{' '}
            <Link to="/register">Register</Link>!
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
