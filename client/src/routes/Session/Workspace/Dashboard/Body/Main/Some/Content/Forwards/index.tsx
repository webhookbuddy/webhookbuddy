import { Webhook } from 'types/Webhook';
import Forward from './Forward';

import styles from './styles.module.css';

const Forwards = ({ webhook }: { webhook: Webhook }) => {
  return (
    <div className={styles.forwards}>
      <div className={styles.list}>
        {webhook.forwards.map(forward => (
          <Forward key={forward.id} forward={forward} />
        ))}
      </div>
    </div>
  );
};

export default Forwards;
