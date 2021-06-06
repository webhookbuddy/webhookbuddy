import { ApolloError, ApolloQueryResult } from '@apollo/client';
import Error from 'components/Error';
import { GetEndpoints } from 'schema/types/GetEndpoints';
import { useState } from 'react';

const AutoForwardDropdown = (props: {
  error: ApolloError | undefined;
  retry: () => Promise<void | ApolloQueryResult<GetEndpoints>>;
  setEndpointId: React.Dispatch<React.SetStateAction<string>>;
  running: boolean;
  data: GetEndpoints | undefined;
  loading: boolean;
}) => {
  const [defaultSelection, setDefaultSelection] = useState('DEFAULT');
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
          onChange={e => {
            setDefaultSelection(e.target.value);
            props.setEndpointId(e.target.value);
          }}
          value={defaultSelection}
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
