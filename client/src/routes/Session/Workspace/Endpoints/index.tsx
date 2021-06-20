import { Route, useLocation } from 'react-router-dom';
import Header from 'components/Header';
import List from './List';
import Create from './Create';

import styles from './styles.module.css';

const Endpoints = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <Header backTo={pathname === '/' ? undefined : '/'} />
      <div className={styles.endpoints}>
        <div className={styles.endpointsFullHeight}>
          <div className={styles.endpointsPadding}>
            <div className="container">
              <Route exact path="/" component={List} />
              <Route path="/endpoints/create" component={Create} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
