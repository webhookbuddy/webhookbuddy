import React from 'react';

import './style.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({
  label,
  isActive,
  isUnread,
  forwardSuccessCount,
  forwardErrorCount,
}: {
  label: string;
  isActive: boolean;
  isUnread: boolean;
  forwardSuccessCount: number;
  forwardErrorCount: number;
}) => {
  return (
    <div
      className={`webhooks__item ${
        isActive ? 'webhooks__item--active' : ''
      } ${isUnread ? 'webhooks__item--unread' : ''}`}
    >
      <div className="webhooks__item__label">{label}</div>
      <div className="webhooks__item__badges">
        {forwardSuccessCount > 0 && (
          <span className="badge badge-success">
            {formatCount(forwardSuccessCount)}
          </span>
        )}{' '}
        {forwardErrorCount > 0 && (
          <span className="badge badge-danger">
            {formatCount(forwardErrorCount)}
          </span>
        )}{' '}
        <i className="fa fa-times-circle"></i>
      </div>
    </div>
  );
};

export default Item;
