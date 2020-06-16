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

  const selectIndex = (index: number, concat: boolean) => {
    setActiveWebhookId(webhooks[index].id);

    if (concat)
      setSelection(selectedWebhookIds.concat(webhooks[index].id));
    else setSingleSelection(webhooks[index]);

    ensureIndexVisible(index);
  };

  const selectPrevious = (concat: boolean) => {
    let selectedIndex = webhooks.findIndex(
      w => w.id === activeWebhookId,
    );

    if (selectedIndex < 1) return;

    selectIndex(selectedIndex - 1, concat);
  };

  const selectNext = (concat: boolean) => {
    let selectedIndex = webhooks.findIndex(
      w => w.id === activeWebhookId,
    );

    if (selectedIndex < 0) {
      if (webhooks.length) selectIndex(0, false);

      return;
    }

    if (webhooks.length > selectedIndex + 1)
      selectIndex(selectedIndex + 1, concat);
  };

  useHotkeys(
    'up',
    e => {
      e.preventDefault();
      selectPrevious(false);
    },
    undefined,
    [selectedWebhookIds],
  );

  useHotkeys(
    'down',
    e => {
      e.preventDefault();
      selectNext(false);
    },
    undefined,
    [selectedWebhookIds],
  );

  useHotkeys(
    'shift+up',
    () => {
      selectPrevious(true);
    },
    undefined,
    [selectedWebhookIds],
  );

  useHotkeys(
    'shift+down',
    () => {
      selectNext(true);
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
