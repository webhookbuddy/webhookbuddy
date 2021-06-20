import { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import Item from './Item';
import {
  FixedSizeList as List,
  ListChildComponentProps,
} from 'react-window';
import Autosizer from 'react-virtualized-auto-sizer';
import useWebhookSelectionManager from 'hooks/useWebhookSelectionManager';
import { useSessionContext } from 'contexts/SessionContext';
import { Webhook } from 'types/Webhook';

const Row = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div style={style} key={index}>
      <Item
        webhook={data.webhooks[index]}
        isSelected={data.selectedWebhookIds.includes(
          data.webhooks[index].id,
        )}
        isActive={data.activeWebhookId === data.webhooks[index].id}
        handleClick={data.handleWebhookClick}
        handleDelete={data.handleWebhookDelete}
      />
    </div>
  );
};

const Webhooks = ({
  webhooks,
  loading,
  error,
}: {
  webhooks: Webhook[];
  loading: boolean;
  error: string | undefined;
}) => {
  const { me } = useSessionContext();
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();
  const listRef = useRef<List>(null);

  const ensureIndexVisible = useCallback((index: number) => {
    listRef.current?.scrollToItem(index);
  }, []);

  const {
    activeWebhookId,
    selectedWebhookIds,
    handleWebhookClick,
    handleWebhookDelete,
  } = useWebhookSelectionManager({
    me,
    endpointId,
    webhooks: webhooks,
    ensureIndexVisible,
  });

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  return (
    <Autosizer>
      {({ height, width }) => (
        <List
          ref={listRef}
          height={height}
          width={width}
          itemCount={webhooks.length}
          itemSize={36}
          itemData={{
            webhooks: webhooks,
            activeWebhookId,
            selectedWebhookIds,
            handleWebhookClick,
            handleWebhookDelete,
          }}
          itemKey={(index, data) => data.webhooks[index].id}
        >
          {Row}
        </List>
      )}
    </Autosizer>
  );
};

export default Webhooks;
