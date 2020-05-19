import React, { useState } from 'react';
import HttpMessage from 'components/HttpMessage';
import { KeyValue, Forward as ForwardType } from 'schema/types';
import moment from 'moment';

import './style.css';

const Forward = ({ forward }: { forward: ForwardType }) => {
  const [isActive, setIsActive] = useState(false);

  const headings = [
    { key: 'Status Code', value: forward.statusCode.toString() },
  ] as KeyValue[];

  return (
    <>
      <div
        className={`forward ${isActive ? 'forward--active' : ''}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className="forward__header">
          <div className="forward__header__label">
            <strong>
              {moment(forward.createdAt).format('MMM DD, YYYY HH:mm')}
            </strong>{' '}
            {forward.method} {forward.url}`}
          </div>
          <div className="forward__header__badges">
            <i
              className={`fa ${
                forward.success
                  ? 'fa-check forward__header__badges__icon--success'
                  : 'fa-exclamation forward__header__badges__icon--error'
              }`}
            ></i>
          </div>
        </div>
      </div>
      {isActive && (
        <div className="forward__details">
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
