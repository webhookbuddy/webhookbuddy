import React from 'react';
import useForwardingIds from 'hooks/useForwardingIds';
import { Webhook } from 'schema/types';
import moment from 'moment';

import './style.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({
  webhook,
  isActive,
  handleClick,
}: {
  webhook: Webhook;
  isActive: boolean;
  handleClick: (webhook: Webhook) => void;
}) => {
  const { forwardingIds } = useForwardingIds();

  const label = `${moment(webhook.createdAt).format(
    'MMM DD, YYYY HH:mm',
  )} | ${webhook.description}`;

  return (
    <div
      className={`webhooks__item ${
        isActive ? 'webhooks__item--active' : ''
      } ${webhook.read ? '' : 'webhooks__item--unread'}`}
      onClick={() => handleClick(webhook)}
    >
      <div className="webhooks__item__label">{label}</div>
      <div className="webhooks__item__badges">
        {forwardingIds.includes(webhook.id) ? (
          <ForwardingBadges />
        ) : (
          <IdleBadges
            forwardSuccessCount={
              webhook.forwards.filter(f => f.success).length
            }
            forwardErrorCount={
              webhook.forwards.filter(f => !f.success).length
            }
          />
        )}
      </div>
    </div>
  );
};

const ForwardingBadges = () => {
  return <i className="fa fa-circle-o-notch fa-spin"></i>;
};

const IdleBadges = ({
  forwardSuccessCount,
  forwardErrorCount,
}: {
  forwardSuccessCount: number;
  forwardErrorCount: number;
}) => {
  return (
    <>
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
    </>
  );
};

export default Item;
