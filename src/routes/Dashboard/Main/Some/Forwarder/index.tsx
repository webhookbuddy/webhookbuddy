import React from 'react';

import './style.css';

const Forwarder = () => {
  return (
    <div className="forwarder">
      <i className="forwarder__icon fa fa-play fa-lg"></i>
      <select className="custom-select custom-select-sm">
        <option>http://localhost/webhooks/take</option>
        <option>http://localhost/webhooks/take</option>
        <option>http://localhost/webhooks/take</option>
        <option>Edit...</option>
      </select>
    </div>
  );
};

export default Forwarder;
