import React from 'react';

import './style.css';

const Tabs = () => {
  return (
    <div className="main__tabs">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="/">
            Request
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            History
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
