import { ApolloQueryResult } from '@apollo/client';
import { GetWebhooks } from 'schema/types/GetWebhooks';

import styles from './styles.module.css';

const Error = ({
  error,
  retry,
}: {
  error: any;
  retry: () => Promise<void | ApolloQueryResult<GetWebhooks>>;
}) => {
  const message =
    error.graphQLErrors?.find(() => true)?.message ?? error.message;
  return (
    <div className={styles.error}>
      <div
        className={`alert alert-danger text-center ${styles.alert}`}
      >
        {message}{' '}
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            retry();
          }}
        >
          Try again
        </a>
      </div>
    </div>
  );
};

export default Error;
