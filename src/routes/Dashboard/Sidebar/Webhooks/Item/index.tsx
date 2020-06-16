import React from 'react';
import useForwardingIds from 'hooks/useForwardingIds';
import { Webhook } from 'schema/types';
import moment from 'moment';

import './style.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({
  webhook,
  isSelected,
  handleClick,
  handleDelete,
}: {
  webhook: Webhook;
  isSelected: boolean;
  handleClick: (
    webhook: Webhook,
    ctrlKey: boolean,
    shiftKey: boolean,
  ) => void;
  handleDelete: (webhookId: string | string[]) => void;
}) => {
  const { forwardingIds } = useForwardingIds();

  const label = `[${moment(webhook.createdAt).format(
    'MMM DD, YYYY HH:mm',
  )}] ${webhook.description}`;

  return (
    <div
      className={`webhooks__item ${
        isSelected ? 'webhooks__item--selected' : ''
      } ${webhook.read ? '' : 'webhooks__item--unread'}`}
      onClick={e => {
        handleClick(webhook, e.ctrlKey, e.shiftKey);
      }}
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
            handleDelete={() => handleDelete(webhook.id)}
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
  handleDelete,
}: {
  forwardSuccessCount: number;
  forwardErrorCount: number;
  handleDelete: () => void;
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
      <i
        className="fa fa-times-circle"
        onClick={e => {
          e.stopPropagation();
          handleDelete();
        }}
      ></i>
    </>
  );
};

export default Item;
