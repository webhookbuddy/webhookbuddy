import { Webhook } from 'types/Webhook';
import HttpMessage from 'components/HttpMessage';

import styles from './styles.module.css';

const Request = ({ webhook }: { webhook: Webhook }) => {
  const headings = [
    { key: 'Method', value: webhook.method },
    { key: 'Host', value: webhook.ipAddress },
  ];
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
