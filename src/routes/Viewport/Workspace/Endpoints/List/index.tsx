import { useQuery } from '@apollo/client';
import EndpointComponent from './Endpoint';
import Loading from 'components/Loading';
import Error from 'components/Error';
import { Link } from 'react-router-dom';
import { GET_ENDPOINTS } from 'schema/queries';
import { GetEndpoints } from 'schema/types/GetEndpoints';

const List = () => {
  const { data, error, loading, refetch } = useQuery<GetEndpoints>(
    GET_ENDPOINTS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  if (error)
    return (
      <Error error={error}>
        <button className="btn btn-primary" onClick={retry}>
          Try again!
        </button>
      </Error>
    );

  if (!data && loading) return <Loading />;

  return (
    <>
      <h2>Endpoints</h2>
      <div className="list-group">
        {data?.endpoints.map(endpoint => (
          <EndpointComponent key={endpoint.id} endpoint={endpoint} />
        ))}
      </div>
      <Link to="/endpoints/create">
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block mt-4"
        >
          Create New Endpoint
        </button>
      </Link>
    </>
  );
};

export default List;
