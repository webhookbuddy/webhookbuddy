import React from 'react';
import Workspace from './Workspace';
import AutoForwarder from './AutoForwarder';

import styles from './styles.module.css';

const Viewport = () => {
  return (
    <div className={styles.viewport}>
      <Workspace />
      <AutoForwarder />
    </div>
  );
};

export default Viewport;
