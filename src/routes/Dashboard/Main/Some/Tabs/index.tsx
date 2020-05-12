import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useForwardingIds from 'hooks/useForwardingIds';

import './style.css';

const Tabs = () => {
  const { endpointId, webhookIds } = useParams();

  const { forwardingIds } = useForwardingIds();

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
            History{' '}
            {forwardingIds.some(id =>
              webhookIds.split(',').includes(id),
            ) && <i className="fa fa-circle-o-notch fa-spin"></i>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
