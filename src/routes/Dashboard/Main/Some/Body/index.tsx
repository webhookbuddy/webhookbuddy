import React from 'react';
import { Route } from 'react-router-dom';
import Request from './Request';
import Forwards from './Forwards';
import { Webhook } from 'schema/types';

import './style.css';

const Body = ({ webhook }: { webhook: Webhook }) => {
  return (
    <div className="main__body">
      <div className="main__body__container">
        <Route
          exact
          path={`/endpoints/:endpointId/webhooks/:webhookIds`}
          render={props => <Request {...props} webhook={webhook} />}
        />
        <Route
          path={`/endpoints/:endpointId/webhooks/:webhookIds/forwards`}
          render={props => <Forwards {...props} webhook={webhook} />}
        />
      </div>
    </div>
  );
};

export default Body;
