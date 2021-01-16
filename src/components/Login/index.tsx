import { gql, useApolloClient, useMutation } from '@apollo/client';
import { usePersistorContext } from 'context/persistor-context';
import { changeLoginState } from 'services/login-state';
import LoginForm from './LoginForm';
import { Login as LoginPayload, LoginVariables } from './types/Login';

const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const client = useApolloClient();
  const persistor = usePersistorContext();
  const [loginUser, { loading, error }] = useMutation<
    LoginPayload,
    LoginVariables
  >(LOGIN_USER, {
    onCompleted: ({ login }) => {
      localStorage.setItem('x-token', login.token);
      changeLoginState(client, persistor, true);
    },
    onError: () => {}, // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  });

  return (
    <LoginForm
      loginUser={loginUser}
      loading={loading}
      error={error}
    />
  );
};

export default Login;
