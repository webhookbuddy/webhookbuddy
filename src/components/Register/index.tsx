import { gql, useApolloClient, useMutation } from '@apollo/client';
import { usePersistorContext } from 'context/persistor-context';
import RegisterForm from './RegisterForm';
import {
  Register as RegisterPayload,
  RegisterVariables,
} from './types/Register';

const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
    }
  }
`;

const Register = () => {
  const client = useApolloClient();
  const persistor = usePersistorContext();

  const [registerUser, { loading, error }] = useMutation<
    RegisterPayload,
    RegisterVariables
  >(REGISTER_USER, {
    onCompleted: ({ register }) => {
      localStorage.setItem('x-token', register.token);
      console.log('Route to login page');
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
