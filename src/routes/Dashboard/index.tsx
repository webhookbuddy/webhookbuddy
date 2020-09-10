import React from 'react';
import Header from './Header';
import Body from './Body';

import styles from './styles.module.css';

const Dashboard = () => {
  return (
    <div className={styles.viewport}>
      <Header />
      <Body />
    </div>
  );
};

export default Dashboard;
