import EndpointItem from './Endpoint';
import { Link } from 'react-router-dom';
import { useWorkspaceContext } from 'contexts/WorkspaceContext';

const List = () => {
  const { endpoints } = useWorkspaceContext();

  return (
    <>
      <h2>Endpoints</h2>
      <div className="list-group">
        {endpoints.map(endpoint => (
          <EndpointItem key={endpoint.id} endpoint={endpoint} />
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
