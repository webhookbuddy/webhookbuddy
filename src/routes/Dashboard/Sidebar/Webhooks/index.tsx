import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFetchWebhooks from 'hooks/useFetchWebhooks';
import Loading from './Loading';
import Error from './Error';
import Item from './Item';
import {
  FixedSizeList as List,
  ListChildComponentProps,
} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Autosizer from 'react-virtualized-auto-sizer';
import useWebhookSelectionManager from 'hooks/useWebhookSelectionManager';

const Row = ({ index, style, data }: ListChildComponentProps) => {
  return (
    <div style={style} key={index}>
      {!data.webhooks[index] ? (
        data.error ? (
          <Error error={data.error} retry={data.retry} />
        ) : (
          <Loading />
        )
      ) : (
        <Item
          webhook={data.webhooks[index]}
          isSelected={data.selectedWebhookIds.includes(
            data.webhooks[index].id,
          )}
          handleClick={data.handleWebhookClick}
        />
      )}
    </div>
  );
};

const Webhooks = () => {
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

  const {
    webhooks,
    hasNextPage,
    error,
    refetch,
    loadMore,
  } = useFetchWebhooks(endpointId);

  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

  const ensureIndexVisible = (index: number) => {
    // @ts-ignore: _listRef is not officially supported: https://github.com/bvaughn/react-window/issues/463#issuecomment-626031477
    infiniteLoaderRef.current?._listRef?.scrollToItem(index);
  };

  const {
    handleWebhookClick,
    selectedWebhookIds,
  } = useWebhookSelectionManager({
    endpointId,
    webhooks,
    ensureIndexVisible,
  });

  // If there are more items to be loaded, add an extra row to hold a loading indicator
  const itemCount = hasNextPage
    ? webhooks.length + 1
    : webhooks.length;

  // Every row is loaded except for loading indicator row
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < webhooks.length;

  return (
    <Autosizer>
      {({ height, width }) => (
        <InfiniteLoader
          ref={infiniteLoaderRef}
          itemCount={itemCount}
          isItemLoaded={isItemLoaded}
          loadMoreItems={() => loadMore() || null}
        >
          {({ onItemsRendered, ref }) => (
            <List
              ref={ref}
              height={height}
              width={width}
              itemCount={itemCount}
              itemSize={36}
              itemData={{
                webhooks,
                selectedWebhookIds,
                handleWebhookClick,
                error,
                retry,
              }}
              itemKey={(index, data) =>
                index > data.webhooks.length - 1
                  ? `x-${Date.now()}`
                  : data.webhooks[index].id
              }
              onItemsRendered={onItemsRendered}
            >
              {Row}
            </List>
          )}
        </InfiniteLoader>
      )}
    </Autosizer>
  );
};

export default Webhooks;
