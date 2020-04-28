import React from 'react';
import { Route } from 'react-router-dom';
import Request from './Request';
import History from './History';

import './style.css';

const Body = () => {
  return (
    <div className="main__body">
      <div className="main__body__container">
        <Route
          exact
          path={`/endpoints/:endpointId/webhooks/:webhookIds`}
          component={Request}
        />
        <Route
          path={`/endpoints/:endpointId/webhooks/:webhookIds/history`}
          component={History}
        />
      </div>
    </div>
  );
};

export default Body;
