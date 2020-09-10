import React from 'react';
import { Route } from 'react-router-dom';
import Request from './Request';
import Forwards from './Forwards';
import { Webhook } from 'schema/types';

import styles from './styles.module.css';

const Content = ({ webhook }: { webhook: Webhook }) => {
  return (
    <div className={styles.content}>
      <Route
        exact
        path={`/dashboard/:endpointId/webhooks/:webhookIds`}
        render={props => <Request {...props} webhook={webhook} />}
      />
      <Route
        path={`/dashboard/:endpointId/webhooks/:webhookIds/forwards`}
        render={props => <Forwards {...props} webhook={webhook} />}
      />
    </div>
  );
};

export default Content;
