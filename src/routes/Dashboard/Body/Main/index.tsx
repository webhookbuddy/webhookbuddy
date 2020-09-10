import React from 'react';
import { Route } from 'react-router-dom';
import None from './None';
import Some from './Some';

import styles from './styles.module.css';

const Main = () => {
  return (
    <div className={styles.main}>
      <Route exact path="/dashboard/:endpointId" component={None} />
      <Route
        path="/dashboard/:endpointId/webhooks/:webhookIds"
        component={Some}
      />
    </div>
  );
};

export default Main;
