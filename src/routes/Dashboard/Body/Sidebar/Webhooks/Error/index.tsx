import React from 'react';
import { ApolloQueryResult } from 'apollo-client';
import { WebhooksPayload } from 'schema/types';

import styles from './styles.module.css';

const Error = ({
  error,
  retry,
}: {
  error: any;
  retry: () => Promise<void | ApolloQueryResult<WebhooksPayload>>;
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
