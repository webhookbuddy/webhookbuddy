import { gql, useApolloClient, useMutation } from '@apollo/client';
import LoginForm from './LoginForm';

const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export interface LoginPayload {
  login: LoginPayloadToken;
}

export interface LoginPayloadToken {
  token: string;
}

export interface LoginVariables {
  input: LoginInput;
}

export interface LoginInput {
  email: string;
  password: string;
}

const Login = () => {
  const client = useApolloClient();
  const [loginUser, { loading, error }] = useMutation<
    LoginPayload,
    LoginVariables
  >(LOGIN_USER, {
    onCompleted: ({ login }) => {
      localStorage.setItem('x-token', login.token);
      client
        .resetStore()
        .then(() => client.writeData({ data: { isLoggedIn: true } }));
    },
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
