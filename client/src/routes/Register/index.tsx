import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, db } from 'config/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import FormLayout, { FormAlignment } from 'components/FormLayout';

const Register = () => {
  const history = useHistory();
  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
  }>({ loading: false, error: undefined });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setState({ loading: true, error: undefined });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await Promise.all([
        (setDoc(
          doc(db, 'users', userCredential.user.uid),
          {
            firstName,
            lastName,
            createdAt: serverTimestamp(),
          },
          { merge: true },
        ),
        sendEmailVerification(userCredential.user)),
      ]);
      history.push('/');
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      });
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
            Register
          </button>
        </div>
        Already have an account? <Link to="/">Log in</Link>
      </form>
    </FormLayout>
  );
};

export default Register;
