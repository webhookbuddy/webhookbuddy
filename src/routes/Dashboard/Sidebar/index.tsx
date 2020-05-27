import React from 'react';
import Filter from './Filter';
import Webhooks from './Webhooks';

import './style.css';

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
