import React from 'react';
import {
  useParams,
  matchPath,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import useFetchWebhooks from 'hooks/useFetchWebhooks';
import useReadWebhook from 'hooks/useReadWebhook';
import { Webhook } from 'schema/types';
import Loading from 'components/Loading';
import Error from 'components/Error';
import Item from './Item';
import { sort, sortDistinct } from 'services/ids';

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

  const handleWebhookClick = (
    webhook: Webhook,
    ctrlKey: boolean,
    shiftKey: boolean,
  ) => {
    if (ctrlKey) {
      setSelection(sortDistinct(activeWebhookIds.concat(webhook.id)));
      return;
    }

    if (shiftKey) {
      const mostRecent = sort(activeWebhookIds)[0];
      let start = webhooks.findIndex(w => w.id === mostRecent);
      if (start === -1) start = 0;

      let end = webhooks.findIndex(w => w.id === webhook.id);

      if (start < 0 || end < 0) return;

      if (end < start) {
        const prevStart = start;
        start = end;
        end = prevStart;
      }

      setSelection(
        webhooks.reduce(
          (acc, cur, index) => {
            if (acc.including) {
              acc.active.push(cur.id);
              if (index === end) acc.including = false;
            } else if (index === start) {
              acc.active.push(cur.id);
              acc.including = true;
            }
            return acc;
          },
          { including: false, active: [] } as {
            including: boolean;
            active: string[];
          },
        ).active,
      );
      return;
    }

    setSingleSelection(webhook);
  };

  const setSingleSelection = (webhook: Webhook) => {
    setSelection([webhook.id]);
    if (!webhook.read) readWebhook(webhook);
  };

  useHotkeys(
    'up',
    () => {
      const mostRecent = sort(activeWebhookIds)[0];
      let start = webhooks.findIndex(w => w.id === mostRecent);
      if (start > 0) setSingleSelection(webhooks[start - 1]);
    },
    undefined,
    [activeWebhookIds],
  );

  useHotkeys(
    'down',
    () => {
      const mostRecent = sort(activeWebhookIds)[0];
      let start = webhooks.findIndex(w => w.id === mostRecent);
      if (start < 0) {
        if (webhooks.length) setSingleSelection(webhooks[0]);
        return;
      }

      if (webhooks.length > start + 1)
        setSingleSelection(webhooks[start + 1]);
    },
    undefined,
    [activeWebhookIds],
  );
  useHotkeys(
    'shift+up',
    () => {
      const mostRecent = sort(activeWebhookIds)[0];
      let start = webhooks.findIndex(w => w.id === mostRecent);
      if (start > 0)
        setSelection(activeWebhookIds.concat(webhooks[start - 1].id));
    },
    undefined,
    [activeWebhookIds],
  );
  useHotkeys(
    'shift+down',
    () => {
      const oldest = sort(activeWebhookIds).reverse()[0];
      let end = webhooks.findIndex(w => w.id === oldest);
      if (end > -1 && end < webhooks.length + 1)
        setSelection(activeWebhookIds.concat(webhooks[end + 1].id));
    },
    undefined,
    [activeWebhookIds],
  );

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
