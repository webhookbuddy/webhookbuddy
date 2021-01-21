import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Endpoints from './Endpoints';
import Dashboard from './Dashboard';
import Docker from './Docker';

import styles from './styles.module.css';

const Workspace = ({
  docked,
  setDocked,
}: {
  docked: Boolean;
  setDocked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Router>
      <div
        className={`${styles.workspace} ${
          docked ? styles.docked : ''
        }`}
      >
        <Switch>
          <Route
            path="/dashboard/:endpointId"
            component={Dashboard}
          />
          <Route path="/" component={Endpoints} />
        </Switch>
        {/* <Docker docked={docked} setDocked={setDocked} /> */}
      </div>
    </Router>
  );
};

export default Workspace;
