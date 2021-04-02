import { FormEvent, useState } from 'react';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

import { ApolloError, MutationFunctionOptions } from '@apollo/client';
import { ExecutionResult } from 'graphql';
import {
  Register as RegisterPayload,
  RegisterVariables,
} from '../types/Register';

const RegisterForm = ({
  registerUser,
  loading,
  error,
}: {
  registerUser: (
    options?:
      | MutationFunctionOptions<RegisterPayload, RegisterVariables>
      | undefined,
  ) => Promise<ExecutionResult<RegisterPayload>>;
  loading: boolean;
  error: ApolloError | undefined;
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log('Send data to server!');
      registerUser({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
          },
        },
      });
    } else {
      console.log('Passwords do not match warning');
    }
  };

  return (
    <div className={styles.container}>
      <div className="gutter" />
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="form-control"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="form-control"
              required
              autoFocus
            />
          </div>
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
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <br />
          Already have an account? <Link to="/">Login</Link>!
        </form>

        <div
          className="alert alert-success mt-2"
          style={{
            display: password !== confirmPassword ? 'block' : 'none',
          }}
          role="alert"
        >
          Passwords do not match!
        </div>
      </div>
      <div className="gutter" />
    </div>
  );
};

export default RegisterForm;
