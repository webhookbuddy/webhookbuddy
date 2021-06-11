import { useState } from 'react';
import { Endpoint } from 'types/Endpoint';

const AutoForwardDropdown = ({
  setEndpointId,
  running,
  endpoints,
}: {
  setEndpointId: React.Dispatch<React.SetStateAction<string>>;
  running: boolean;
  endpoints: Endpoint[];
}) => {
  const [defaultSelection, setDefaultSelection] = useState('DEFAULT');
  return (
    <div className="form-group">
      <label>Endpoint</label>
      <select
        className="custom-select custom-select-sm"
        onChange={e => {
          setDefaultSelection(e.target.value);
          setEndpointId(e.target.value);
        }}
        value={defaultSelection}
        disabled={running}
      >
        <option value="DEFAULT" disabled>
          Choose an endpoint
        </option>
        {endpoints.map(endpoint => (
          <option key={endpoint.id} value={endpoint.id}>
            {endpoint.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AutoForwardDropdown;
