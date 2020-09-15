import React from 'react';

import styles from './styles.module.css';

const AutoForwarder = () => {
  return (
    <div className={`${styles.autoForwarder} ${styles.docked}`}>
      <div
        className={`${styles.recorderIcon} ${styles.recorderIconOn}`}
      >
        <i className={`fa fa-circle fa-2x ${styles.button}`}></i>
      </div>
      <div className="form-group">
        <label>Endpoint</label>
        <select className="custom-select custom-select-sm"></select>
      </div>
      <div className="form-group">
        <label>Auto-forward to</label>
        <select className="custom-select custom-select-sm"></select>
      </div>
    </div>
  );
};

export default AutoForwarder;
