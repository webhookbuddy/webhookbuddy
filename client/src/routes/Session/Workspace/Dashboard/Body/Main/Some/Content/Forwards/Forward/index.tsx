import { useState } from 'react';
import HttpMessage from 'components/HttpMessage';
import { Forward as ForwardType } from 'types/Forward';
import moment from 'moment';
import { toDate } from 'services/date';
import PeopleIcon from 'components/PeopleIcon';
import { useSessionContext } from 'contexts/SessionContext';

import styles from './styles.module.css';

const Forward = ({ forward }: { forward: ForwardType }) => {
  const { me } = useSessionContext();
  const [isActive, setIsActive] = useState(false);

  const headings = [
    { key: 'Status Code', value: forward.statusCode.toString() },
  ];

  return (
    <>
      <div
        className={isActive ? styles.active : ''}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={styles.header}>
          <div className={styles.label}>
            [
            {moment(toDate(forward.createdAt)).format(
              'MMM DD, YYYY HH:mm',
            )}
            ] {forward.method} {forward.url}
          </div>
          <div className={styles.badges}>
            {forward.userId !== me.id && (
              <>
                <PeopleIcon />{' '}
                <strong>
                  {forward.user.firstName} {forward.user.lastName}
                </strong>{' '}
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
