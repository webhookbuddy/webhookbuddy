import React, { useState } from 'react';
import Workspace from './Workspace';
// import AutoForwarder from './AutoForwarder';

import styles from './styles.module.css';

const Viewport = () => {
  const [docked, setDocked] = useState(false);

  return (
    <div className={styles.viewport}>
      <Workspace docked={docked} setDocked={setDocked} />
      {/* <AutoForwarder docked={docked} /> */}
    </div>
  );
};

export default Viewport;
