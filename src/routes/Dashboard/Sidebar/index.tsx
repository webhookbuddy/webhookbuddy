import React from 'react';
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
  return (
    <div className="sidebar">
      <Filter />
      <div className="sidebar__content">
        <Webhooks />
      </div>
    </div>
  );
};

export default Sidebar;
