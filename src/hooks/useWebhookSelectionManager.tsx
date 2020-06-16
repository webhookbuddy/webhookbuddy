import { useState } from 'react';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { Webhook } from 'schema/types';
import { sortDistinct, sort } from 'services/ids';
import useReadWebhook from './useReadWebhook';
import useDeleteWebhooks from './useDeleteWebhooks';

const useWebhookSelectionManager = ({
  endpointId,
  webhooks,
  ensureIndexVisible,
}: {
  endpointId: string;
  webhooks: Webhook[];
  ensureIndexVisible: (index: number) => void;
}) => {
  const history = useHistory();
  const location = useLocation();
  const { readWebhook } = useReadWebhook();
  const { deleteWebhooks } = useDeleteWebhooks(endpointId);

  const match = matchPath<{
    webhookIds: string | undefined;
  }>(location.pathname, {
    path: '/dashboard/:endpointId/webhooks/:webhookIds',
  });

  const selectedWebhookIds =
    match?.params.webhookIds?.split(',') ?? [];

  const setSelection = (ids: string[]) => {
    const path = !ids.length
      ? `/dashboard/${endpointId}`
      : location.pathname.includes('/forwards')
      ? `/dashboard/${endpointId}/webhooks/${ids.join(',')}/forwards`
      : `/dashboard/${endpointId}/webhooks/${ids.join(',')}`;

    if (location.pathname !== path) history.push(path);
  };

  const [activeWebhookId, setActiveWebhookId] = useState<
    string | undefined
  >(selectedWebhookIds.length ? selectedWebhookIds[0] : undefined);

  const handleWebhookClick = (
    webhook: Webhook,
    ctrlKey: boolean,
    shiftKey: boolean,
  ) => {
    setActiveWebhookId(webhook.id);

    if (ctrlKey) {
      setSelection(
        sortDistinct(selectedWebhookIds.concat(webhook.id)),
      );
      return;
    }

    if (shiftKey) {
      const mostRecent = sort(selectedWebhookIds)[0];
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
              acc.selected.push(cur.id);
              if (index === end) acc.including = false;
            } else if (index === start) {
              acc.selected.push(cur.id);
              acc.including = true;
            }
            return acc;
          },
          { including: false, selected: [] } as {
            including: boolean;
            selected: string[];
          },
        ).selected,
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
    e => {
      e.preventDefault();
      let start = webhooks.findIndex(w => w.id === activeWebhookId);
      if (start > 0) {
        setActiveWebhookId(webhooks[start - 1].id);
        setSingleSelection(webhooks[start - 1]);
        ensureIndexVisible(start - 1);
      }
    },
    undefined,
    [selectedWebhookIds],
  );

  useHotkeys(
    'down',
    e => {
      e.preventDefault();
      const start = webhooks.findIndex(w => w.id === activeWebhookId);
      if (start < 0) {
        if (webhooks.length) {
          setActiveWebhookId(webhooks[0].id);
          setSingleSelection(webhooks[0]);
          ensureIndexVisible(0);
        }
        return;
      }

      if (webhooks.length > start + 1) {
        setActiveWebhookId(webhooks[start + 1].id);
        setSingleSelection(webhooks[start + 1]);
        ensureIndexVisible(start + 1);
      }
    },
    undefined,
    [selectedWebhookIds],
  );

  useHotkeys(
    'shift+up',
    () => {
      const start = webhooks.findIndex(w => w.id === activeWebhookId);
      if (start > 0) {
        setActiveWebhookId(webhooks[start - 1].id);
        setSelection(
          selectedWebhookIds.concat(webhooks[start - 1].id),
        );
        ensureIndexVisible(start - 1);
      }
    },
    undefined,
    [selectedWebhookIds],
  );

  useHotkeys(
    'shift+down',
    () => {
      const end = webhooks.findIndex(w => w.id === activeWebhookId);
      if (end > -1 && end < webhooks.length + 1) {
        setActiveWebhookId(webhooks[end + 1].id);
        setSelection(selectedWebhookIds.concat(webhooks[end + 1].id));
        ensureIndexVisible(end + 1);
      }
    },
    undefined,
    [selectedWebhookIds],
  );

  const handleWebhookDelete = (webhookId: string | string[]) => {
    const ids = Array.isArray(webhookId) ? webhookId : [webhookId];
    deleteWebhooks(ids);
    setSelection(selectedWebhookIds.filter(i => !ids.includes(i)));
  };

  useHotkeys(
    'del',
    () => handleWebhookDelete(selectedWebhookIds),
    undefined,
    [selectedWebhookIds],
  );

  return {
    selectedWebhookIds,
    handleWebhookClick,
    handleWebhookDelete,
  };
};

export default useWebhookSelectionManager;
