import React, { useState } from 'react';
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
import {
  FixedSizeList as List,
  ListChildComponentProps,
} from 'react-window';
import Autosizer from 'react-virtualized-auto-sizer';

const Row = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div style={style} key={index}>
      <Item
        webhook={data.webhooks[index]}
        isActive={data.activeWebhookId === data.webhooks[index].id}
        isSelected={data.selectedWebhookIds.includes(
          data.webhooks[index].id,
        )}
        handleClick={data.handleWebhookClick}
        ensureVisible={data.ensureVisible}
      />
    </div>
  );
};

const Webhooks = ({
  ensureVisible,
}: {
  ensureVisible: (element: HTMLElement) => void;
}) => {
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

  const [activeWebhookId, setActiveWebhookId] = useState<
    string | undefined
  >();

  const match = matchPath<{
    webhookIds: string | undefined;
  }>(location.pathname, {
    path: '/endpoints/:endpointId/webhooks/:webhookIds',
  });
  const selectedWebhookIds =
    match?.params.webhookIds?.split(',') ?? [];

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
        }
        return;
      }

      if (webhooks.length > start + 1) {
        setActiveWebhookId(webhooks[start + 1].id);
        setSingleSelection(webhooks[start + 1]);
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
      }
    },
    undefined,
    [selectedWebhookIds],
  );

  return (
    <>
      <Autosizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={webhooks.length}
            itemSize={36}
            itemData={{
              webhooks,
              activeWebhookId,
              selectedWebhookIds,
              handleWebhookClick,
              ensureVisible,
            }}
            itemKey={(index, data) => data.webhooks[index].id}
          >
            {Row}
          </List>
        )}
      </Autosizer>
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
    </>
  );
};

export default Webhooks;
