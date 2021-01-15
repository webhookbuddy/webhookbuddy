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
      // https://stackoverflow.com/a/53844411/188740
      // Calling resetStore without calling clearStore first will result in all queries being refetched without an x-token header.
      // We need resetStore b/c calling cache.modify from clearStore's promise resolver doesn't broadcast changes to re-query isLoggedIn in App.tsx
      client.clearStore().then(() => {
        client.resetStore().then(() => {
          client.cache.modify({
            fields: {
              isLoggedIn: () => true,
            },
          });
        });
      });
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
