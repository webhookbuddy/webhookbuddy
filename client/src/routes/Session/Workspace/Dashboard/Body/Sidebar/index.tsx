import { useEffect, useState } from 'react';
import Filter from './Filter';
import Webhooks from './Webhooks';
import { Webhook } from 'types/Webhook';

import styles from './styles.module.css';
import { useDashboardContext } from 'contexts/DashboardContext';
import { useSessionContext } from 'contexts/SessionContext';

export enum FilterEnum {
  All = 'All',
  Unread = 'Unread',
  Read = 'Read',
  Unforwarded = 'Unforwarded',
  Forwarded = 'Forwarded',
  Last24Hours = 'Last 24 hours',
}

const Sidebar = () => {
  const { webhooks, webhooksLoading, webhooksError } =
    useDashboardContext();
  const { me } = useSessionContext();

  const [filter, setFilter] = useState(FilterEnum.All);
  const [filteredWebhooks, setFilteredWebhooks] = useState<Webhook[]>(
    [],
  );

  useEffect(() => {
    if (!webhooks) return;
    const filterValue = FilterEnum[filter as keyof typeof FilterEnum];

    const dayAgo = new Date();
    dayAgo.setDate(dayAgo.getDate() - 1);

    setFilteredWebhooks(
      filterValue === FilterEnum.Unread
        ? webhooks.filter(w => !w.reads[me.id])
        : filterValue === FilterEnum.Read
        ? webhooks.filter(w => w.reads[me.id])
        : filterValue === FilterEnum.Unforwarded
        ? webhooks.filter(w => !w.forwards.length)
        : filterValue === FilterEnum.Forwarded
        ? webhooks.filter(w => w.forwards.length)
        : filterValue === FilterEnum.Last24Hours
        ? webhooks.filter(
            w => new Date(w.createdAt.toDate()) > dayAgo,
          )
        : webhooks,
    );
  }, [me.id, webhooks, filter, setFilteredWebhooks]);

  return (
    <div className={styles.sidebar}>
      <Filter filter={filter} setFilter={setFilter} />
      <div className={styles.list}>
        <Webhooks
          webhooks={filteredWebhooks}
          loading={webhooksLoading}
          error={webhooksError}
        />
      </div>
    </div>
  );
};

export default Sidebar;
