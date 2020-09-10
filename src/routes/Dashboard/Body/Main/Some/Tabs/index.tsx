import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import useForwardingIds from 'hooks/useForwardingIds';

import styles from './styles.module.css';

const Tabs = () => {
  const { endpointId, webhookIds } = useParams();

  const { forwardingIds } = useForwardingIds();

  return (
    <div className={styles.tabs}>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            exact
            to={`/dashboard/${endpointId}/webhooks/${webhookIds}`}
            className="nav-link"
          >
            Request
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={`/dashboard/${endpointId}/webhooks/${webhookIds}/forwards`}
            className="nav-link"
          >
            Forwards{' '}
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
