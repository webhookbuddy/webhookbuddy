import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Item from './Item';
import useFetchWebhooks from 'hooks/useFetchWebhooks';

const Webhooks = () => {
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();

  const { webhooks, loading, error, refetch } = useFetchWebhooks(
    endpointId,
  );

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  return (
    <div className="webhooks">
      {webhooks.map(webhook => (
        <Item key={webhook.id} webhook={webhook} />
      ))}
      {loading ? (
        <Loading />
      ) : (
        error && (
          <Error error={error}>
            <button className="btn btn-primary" onClick={retry}>
              Try again!
            </button>
          </Error>
        )
      )}
    </div>
  );
};

export default Webhooks;
