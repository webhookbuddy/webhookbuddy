import { ApolloError, ApolloQueryResult } from '@apollo/client';
import Error from 'components/Error';
import { GetEndpoints } from 'schema/types/GetEndpoints';

const AutoForwardDropdown = (props: {
  error: ApolloError | undefined;
  retry: () => Promise<void | ApolloQueryResult<GetEndpoints>>;
  setEndpointId: React.Dispatch<React.SetStateAction<string>>;
  running: boolean;
  data: GetEndpoints | undefined;
  loading: boolean;
}) => {
  return (
    <div className="form-group">
      <label>Endpoint</label>
      {props.error ? (
        <div style={{ fontSize: '10px' }}>
          <Error error="">
            <button
              className="btn btn-primary btn-sm"
              onClick={props.retry}
            >
              Try again!
            </button>
          </Error>
        </div>
      ) : (
        <select
          className="custom-select custom-select-sm"
          onChange={e => props.setEndpointId(e.target.value)}
          defaultValue={'DEFAULT'}
          disabled={props.running}
        >
          <option value="DEFAULT" disabled>
            Choose an endpoint
          </option>
          {props.data &&
            !props.loading &&
            props.data?.endpoints.map(endpoint => (
              <option key={endpoint.id} value={endpoint.id}>
                {endpoint.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default AutoForwardDropdown;
