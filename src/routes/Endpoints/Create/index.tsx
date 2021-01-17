import { FormEvent, useState } from 'react';
import { ENDPOINT_FRAGMENT } from 'schema/fragments';
import { gql, useMutation } from '@apollo/client';
import Error from 'components/Error';
import Loading from 'components/Loading';
import { useHistory } from 'react-router-dom';
import {
  CreateEndpoint,
  CreateEndpointVariables,
} from './types/CreateEndpoint';
import { GET_ENDPOINTS } from 'schema/queries';
import { GetEndpoints } from 'schema/types/GetEndpoints';

const CREATE_ENDPOINT = gql`
  mutation CreateEndpoint($input: CreateEndpointInput!) {
    createEndpoint(input: $input) {
      endpoint {
        ...Endpoint
      }
    }
  }
  ${ENDPOINT_FRAGMENT}
`;

const Create = () => {
  const history = useHistory();
  const [createEndpoint, { loading, error }] = useMutation<
    CreateEndpoint,
    CreateEndpointVariables
  >(CREATE_ENDPOINT, {
    update: (cache, { data }) => {
      const endpoint = data?.createEndpoint.endpoint;
      if (!endpoint) return;

      const endpointsData = cache.readQuery<GetEndpoints>({
        query: GET_ENDPOINTS,
      });

      cache.writeQuery({
        query: GET_ENDPOINTS,
        data: {
          ...endpointsData,
          endpoints: [...(endpointsData?.endpoints ?? []), endpoint],
        },
      });
    },
    onCompleted: () => history.push('/'),
    onError: () => {}, // Handle error to avoid unhandled rejection: https://github.com/apollographql/apollo-client/issues/6070
  });

  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEndpoint({
      variables: {
        input: {
          name,
        },
      },
    }).catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963
  };

  return (
    <>
      <h2>New Endpoint</h2>
      {error && <Error error={error} />}
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoFocus
            />
            <small className="form-text text-muted">
              Give your new new endpoint a name so that it's easy to
              identify.
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default Create;
