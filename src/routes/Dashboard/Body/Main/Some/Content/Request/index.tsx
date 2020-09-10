import React from 'react';
import HttpMessage from 'components/HttpMessage';
import { Webhook, KeyValue } from 'schema/types';

import styles from './styles.module.css';

const Request = ({ webhook }: { webhook: Webhook }) => {
  const headings = [
    { key: 'Method', value: webhook.method },
    { key: 'Host', value: webhook.ipAddress },
  ] as KeyValue[];
  return (
    <div className={styles.request}>
      <HttpMessage
        type="Request"
        headings={headings}
        message={webhook}
      />
    </div>
  );
};

export default Request;
