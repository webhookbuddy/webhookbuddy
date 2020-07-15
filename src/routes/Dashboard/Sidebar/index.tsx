import React, { useState } from 'react';
import Filter from './Filter';
import Webhooks from './Webhooks';

import './style.css';

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
    <div className="sidebar">
      <Filter filter={filter} setFilter={setFilter} />
      <div className="sidebar__content">
        <Webhooks />
      </div>
    </div>
  );
};

export default Sidebar;
