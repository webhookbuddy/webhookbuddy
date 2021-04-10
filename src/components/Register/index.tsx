import { useApolloClient, useMutation } from '@apollo/client';
import { usePersistorContext } from 'context/persistor-context';
import { changeLoginState } from 'services/login-state';
import RegisterForm from './RegisterForm';
import { REGISTER_USER } from 'schema/queries';
import {
  Register as RegisterPayload,
  RegisterVariables,
} from 'schema/types/Register';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const client = useApolloClient();
  const persistor = usePersistorContext();
  const history = useHistory();

  const [registerUser, { loading, error }] = useMutation<
    RegisterPayload,
    RegisterVariables
  >(REGISTER_USER, {
    onCompleted: ({ register }) => {
      localStorage.setItem('x-token', register.token);
      changeLoginState(client, persistor, true);
      history.push('/');
    },
    onError: () => {}, // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  });

  return (
    <div>
      <RegisterForm
        registerUser={registerUser}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Register;
