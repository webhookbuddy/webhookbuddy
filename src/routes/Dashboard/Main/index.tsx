import React from 'react';
import { Route } from 'react-router-dom';
import None from './None';
import Some from './Some';

import './style.css';

const Main = () => {
  return (
    <div className="main">
      <Route exact path="/endpoints/:endpointId" component={None} />
      <Route
        path="/endpoints/:endpointId/webhooks/:webhookIds"
        component={Some}
      />
    </div>
  );
};

export default Main;
