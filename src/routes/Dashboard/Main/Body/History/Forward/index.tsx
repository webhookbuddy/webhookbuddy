import React, { useState } from 'react';
import HttpMessage from 'components/HttpMessage';

import './style.css';

const Forward = ({
  label,
  isSuccess,
}: {
  label: string;
  isSuccess: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`forward ${isActive ? 'forward--active' : ''}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="forward__header">
        <div className="forward__header__label">{label}</div>
        <div className="forward__header__badges">
          <i
            className={`fa ${
              isSuccess
                ? 'fa-check forward__header__badges__icon--success'
                : 'fa-exclamation forward__header__badges__icon--error'
            }`}
          ></i>
        </div>
      </div>
      {isActive && (
        <div className="forward__details">
          <HttpMessage type="Response" />
        </div>
      )}
    </div>
  );
};

export default Forward;
