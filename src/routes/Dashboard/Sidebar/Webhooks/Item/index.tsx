import React from 'react';
import {
  useParams,
  useHistory,
  useLocation,
  matchPath,
} from 'react-router-dom';
import useForwardingIds from 'hooks/useForwardingIds';
import useReadWebhook from 'hooks/useReadWebhook';
import { Webhook } from 'schema/types';
import moment from 'moment';

import './style.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({ webhook }: { webhook: Webhook }) => {
  const { endpointId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { forwardingIds } = useForwardingIds();
  const { readWebhook } = useReadWebhook();

  const label = `${webhook.method}: ${moment(
    webhook.createdAt,
  ).format('LLL')}`;

  const match = matchPath<{
    webhookIds: string | undefined;
  }>(location.pathname, {
    path: '/endpoints/:endpointId/webhooks/:webhookIds',
  });

  const isActive =
    match?.params.webhookIds
      ?.split(',')
      .some(paramId => paramId === webhook.id) === true;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const path = location.pathname.includes('/forwards')
      ? `/endpoints/${endpointId}/webhooks/${webhook.id}/forwards`
      : `/endpoints/${endpointId}/webhooks/${webhook.id}`;

    if (location.pathname !== path) history.push(path);
    if (!webhook.read) readWebhook(webhook);
  };

  return (
    <div
      className={`webhooks__item ${
        isActive ? 'webhooks__item--active' : ''
      } ${webhook.read ? '' : 'webhooks__item--unread'}`}
      onClick={handleClick}
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
