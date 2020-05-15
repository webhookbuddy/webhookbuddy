import React from 'react';
import Header from './Header';
import gql from 'graphql-tag';
import { ENDPOINT_FRAGMENT } from 'schema/fragments';
import { useQuery } from '@apollo/react-hooks';
import { Endpoint } from 'schema/types';
import EndpointComponent from './Endpoint';
import Loading from 'components/Loading';
import Error from 'components/Error';

import './style.css';

export const GET_ENDPOINTS = gql`
  query getEndpoints {
    endpoints {
      ...endpoint
    }
  }
  ${ENDPOINT_FRAGMENT}
`;

export interface EndpointsPayload {
  endpoints: Endpoint[];
}

const Endpoints = () => {
  const { data, error, loading, refetch } = useQuery<
    EndpointsPayload
  >(GET_ENDPOINTS, {
    fetchPolicy: 'cache-and-network',
  });

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
    <div className="viewport viewport--endpoints">
      <Header />
      <div className="endpoints">
        <div className="endpoints__container">
          <div className="endpoints__container__pad">
            <div className="container">
              <h2>Endpoints</h2>
              <div className="list-group">
                {data?.endpoints.map(endpoint => (
                  <EndpointComponent
                    key={endpoint.id}
                    endpoint={endpoint}
                  />
                ))}
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block mt-4"
              >
                Create New Endpoint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
