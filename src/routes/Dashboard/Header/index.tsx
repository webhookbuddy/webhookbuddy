import React from 'react';
import Endpoint from './Endpoint';
import AutoForward from './AutoForward';

import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <Endpoint />
      <AutoForward />
    </div>
  );
};

export default Header;
