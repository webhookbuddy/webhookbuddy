import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import './style.css';

const Tabs = () => {
  const { endpointId, webhookIds } = useParams();
  return (
    <div className="main__tabs">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            exact
            to={`/endpoints/${endpointId}/webhooks/${webhookIds}`}
            className="nav-link"
          >
            Request
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/endpoints/${endpointId}/webhooks/${webhookIds}/history`}
            className="nav-link"
          >
            History
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
