import React from 'react';
import HttpMessage from 'components/HttpMessage';

import './style.css';

const Request = () => {
  return (
    <div className="main_body__request">
      <HttpMessage type="Request" />
    </div>
  );
};

export default Request;
