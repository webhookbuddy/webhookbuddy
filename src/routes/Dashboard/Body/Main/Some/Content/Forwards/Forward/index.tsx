import React, { useState } from 'react';
import HttpMessage from 'components/HttpMessage';
import { KeyValue, Forward as ForwardType } from 'schema/types';
import moment from 'moment';

import styles from './styles.module.css';
import { useMe } from 'context/user-context';
import PeopleIcon from 'components/PeopleIcon';

const Forward = ({ forward }: { forward: ForwardType }) => {
  const me = useMe();
  const [isActive, setIsActive] = useState(false);

  const headings = [
    { key: 'Status Code', value: forward.statusCode.toString() },
  ] as KeyValue[];

  return (
    <>
      <div
        className={isActive ? styles.active : ''}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={styles.header}>
          <div className={styles.label}>
            [{moment(forward.createdAt).format('MMM DD, YYYY HH:mm')}]{' '}
            {forward.method} {forward.url}
          </div>
          <div className={styles.badges}>
            {forward.user.id !== me?.id && (
              <>
                <PeopleIcon />{' '}
              </>
            )}
            <i
              className={`fa ${
                forward.success
                  ? `fa-check ${styles.successIcon}`
                  : `fa-exclamation ${styles.errorIcon}`
              }`}
            ></i>
          </div>
        </div>
      </div>
      {isActive && (
        <div className={styles.details}>
          <HttpMessage
            type="Response"
            headings={headings}
            message={forward}
          />
        </div>
      )}
    </>
  );
};

export default Forward;
