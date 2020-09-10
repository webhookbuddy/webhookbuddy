import React from 'react';
import { Link } from 'react-router-dom';
import { Endpoint } from 'schema/types';
import moment from 'moment';
import Delete from './Delete';

import styles from './styles.module.css';

const List = ({ endpoint }: { endpoint: Endpoint }) => {
  const handleCopyClick = (e: React.MouseEvent<HTMLElement>) => {
    navigator.clipboard.writeText(endpoint.url);
  };

  return (
    <div className="list-group-item list-group-item-action list-group-item-secondary">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">
          <Link to={`/dashboard/${endpoint.id}`}>
            {endpoint.name}
          </Link>
        </h5>
        <small>Created {moment(endpoint.createdAt).fromNow()}</small>
      </div>
      <div className="mb-1">Send your webhooks to this URL:</div>
      <div className={`mb-1 ${styles.url}`}>
        <div>
          <input
            type="text"
            value={endpoint.url}
            onFocus={e => e.target.select()}
            readOnly
            className={styles.input}
          />
        </div>
        <i
          className={`fa fa-clipboard pointer ${styles.icon}`}
          onClick={handleCopyClick}
        ></i>
        <Delete endpoint={endpoint} iconStyle={styles.icon} />
      </div>
    </div>
  );
};

export default List;
