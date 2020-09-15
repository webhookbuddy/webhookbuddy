import { useState } from 'react';
import Filter from './Filter';
import Webhooks from './Webhooks';

import styles from './styles.module.css';

export enum FilterEnum {
  All = 'All',
  Unread = 'Unread',
  Read = 'Read',
  Unforwarded = 'Unforwarded',
  Forwarded = 'Forwarded',
  Last24Hours = 'Last 24 hours',
}

const Sidebar = () => {
  const [filter, setFilter] = useState(FilterEnum.All);

  return (
    <div className={styles.sidebar}>
      <Filter filter={filter} setFilter={setFilter} />
      <div className={styles.list}>
        <Webhooks filter={filter} />
      </div>
    </div>
  );
};

export default Sidebar;
