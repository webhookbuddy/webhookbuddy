import React, { useState } from 'react';
import gql from 'graphql-tag';
import { ENDPOINT_FRAGMENT } from 'schema/fragments';
import { useMutation } from '@apollo/react-hooks';
import Error from 'components/Error';
import Loading from 'components/Loading';
import { useHistory } from 'react-router-dom';

const CREATE_ENDPOINT = gql`
  mutation createEndpoint($input: CreateEndpointInput!) {
    createEndpoint(input: $input) {
      endpoint {
        ...endpoint
      }
    }
  }
  ${ENDPOINT_FRAGMENT}
`;

const Create = () => {
  const history = useHistory();
  const [createEndpoint, { loading, error }] = useMutation(
    CREATE_ENDPOINT,
    {
      onCompleted: () => history.push('/'),
    },
  );
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
