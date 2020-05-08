import React from 'react';
import HttpMessage from 'components/HttpMessage';
import { Webhook } from 'schema/types';

import './style.css';

const Request = ({ webhook }: { webhook: Webhook }) => {
  return (
    <div className="main_body__request">
      <HttpMessage type="Request" />
    </div>
  );
};

export default Request;
