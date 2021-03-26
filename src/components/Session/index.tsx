import { useQuery } from '@apollo/client';
import { useSetMe } from 'context/user-context';
import Error from 'components/Error';
import Loading from 'components/Loading';
import { GetMe } from 'schema/types/GetMe';
import { GET_ME } from 'schema/queries';

const Session = () => {
  const setMe = useSetMe();

  const { loading, error, refetch } = useQuery<GetMe>(GET_ME, {
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ me }) => {
      // After installing apollo-cache-persist, this results in 'Can't perform a React state update on an unmounted component.' warning whenever getMe query is in persisted cache.
      // This warning only appears because I'm using <React.StrictMode>.
      // https://github.com/apollographql/react-apollo/issues/3635
      // I believe the reason for this problem is that onCompleted gets called synchronously if it's coming from persisted cache, and then the rest of this
      // component gets rendered by useState triggers inside useQuery. By the time that happens though, this component has unmounted due to setMe().
      setMe(me);
    },
    onError: () => {}, // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  });

  const retry = () => refetch();

  if (error)
    return (
      <Error error={error}>
        <button className="btn btn-primary" onClick={retry}>
          Try again!
        </button>
      </Error>
    );

  if (loading) return <Loading />;

  return <div>Almost ready...</div>;
};

export default Session;
