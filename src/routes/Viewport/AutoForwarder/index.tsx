import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ENDPOINTS } from 'schema/queries';
import { GetEndpoints } from 'schema/types/GetEndpoints';
import Error from 'components/Error';

import styles from './styles.module.css';

const AutoForwarder = ({ docked }: { docked: Boolean }) => {
  const { data, error, loading, refetch } = useQuery<GetEndpoints>(
    GET_ENDPOINTS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const [endpointId, setEndpointId] = useState('');

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  return (
    <div
      className={`${styles.autoForwarder} ${
        docked ? styles.docked : ''
      }`}
    >
      <div
        className={`${styles.recorderIcon} ${styles.recorderIconOn}`}
      >
        <i className={`fa fa-circle fa-2x ${styles.button}`}></i>
      </div>
      <div className="form-group">
        <label>Endpoint</label>
        {error ? (
          <div style={{ fontSize: '10px' }}>
            <Error error="">
              <button
                className="btn btn-primary btn-sm"
                onClick={retry}
              >
                Try again!
              </button>
            </Error>
          </div>
        ) : (
          <select
            className="custom-select custom-select-sm"
            onChange={e => setEndpointId(e.target.value)}
            value={endpointId}
          >
            {data &&
              !loading &&
              data?.endpoints.map(endpoint => (
                <option key={endpoint.id} value={endpoint.id}>
                  {endpoint.name}
                </option>
              ))}
          </select>
        )}
      </div>
      <div className="form-group">
        <label>Auto-forward to</label>
        <select className="custom-select custom-select-sm"></select>
      </div>
    </div>
  );
};

export default AutoForwarder;
