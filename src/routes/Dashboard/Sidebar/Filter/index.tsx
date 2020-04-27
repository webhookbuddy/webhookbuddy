import React from 'react';

import './style.css';

const Filter = () => {
  return (
    <div className="sidebar__filter">
      <select className="custom-select custom-select-sm">
        <option>Last 500</option>
        <option>Last 24 hours</option>
        <option>Unprocessed</option>
        <option>Processed</option>
      </select>
    </div>
  );
};

export default Filter;
