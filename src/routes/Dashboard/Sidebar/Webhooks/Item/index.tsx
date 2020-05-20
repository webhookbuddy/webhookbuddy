import React, { useRef, useEffect } from 'react';
import useForwardingIds from 'hooks/useForwardingIds';
import { Webhook } from 'schema/types';
import moment from 'moment';

import './style.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({
  webhook,
  isActive,
  isSelected,
  handleClick,
  ensureVisible,
}: {
  webhook: Webhook;
  isActive: boolean;
  isSelected: boolean;
  handleClick: (
    webhook: Webhook,
    ctrlKey: boolean,
    shiftKey: boolean,
  ) => void;
  ensureVisible: (element: HTMLElement) => void;
}) => {
  const { forwardingIds } = useForwardingIds();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && containerRef.current)
      ensureVisible(containerRef.current);
  }, [isActive, ensureVisible]);

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
      ref={containerRef}
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
