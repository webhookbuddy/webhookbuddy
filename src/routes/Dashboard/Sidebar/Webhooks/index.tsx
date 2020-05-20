import React from 'react';
import {
  useParams,
  matchPath,
  useLocation,
  useHistory,
} from 'react-router-dom';
import useFetchWebhooks from 'hooks/useFetchWebhooks';
import useReadWebhook from 'hooks/useReadWebhook';
import { Webhook } from 'schema/types';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Item from './Item';

const Webhooks = () => {
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  const { webhooks, loading, error, refetch } = useFetchWebhooks(
    endpointId,
  );
  const { readWebhook } = useReadWebhook();
  const history = useHistory();
  const location = useLocation();

  const match = matchPath<{
    webhookIds: string | undefined;
  }>(location.pathname, {
    path: '/endpoints/:endpointId/webhooks/:webhookIds',
  });

  const activeWebhookIds = match?.params.webhookIds?.split(',') ?? [];

  const setSelection = (ids: string[]) => {
    const path = location.pathname.includes('/forwards')
      ? `/endpoints/${endpointId}/webhooks/${ids.join(',')}/forwards`
      : `/endpoints/${endpointId}/webhooks/${ids.join(',')}`;

    if (location.pathname !== path) history.push(path);
  };

  const handleWebhookClick = (webhook: Webhook) => {
    setSelection([webhook.id]);
    if (!webhook.read) readWebhook(webhook);
  };

  return (
    <div className="webhooks">
      {webhooks.map(webhook => (
        <Item
          key={webhook.id}
          webhook={webhook}
          isActive={activeWebhookIds.includes(webhook.id)}
          handleClick={handleWebhookClick}
        />
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
