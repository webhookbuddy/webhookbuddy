import React from 'react';
import HttpMessage from 'components/HttpMessage';
import { Webhook, KeyValue } from 'schema/types';

import './style.css';

const Request = ({ webhook }: { webhook: Webhook }) => {
  const headings = [
    { key: 'Host', value: webhook.ipAddress },
  ] as KeyValue[];
  return (
    <div className="main_body__request">
      <HttpMessage
        type="Request"
        headings={headings}
        message={webhook}
      />
    </div>
  );
};

export default Request;
