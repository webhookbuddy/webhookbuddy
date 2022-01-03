import { Webhook } from 'types/Webhook';
import dayjs from 'dayjs';
import PeopleIcon from 'components/PeopleIcon';
import { webhookDescription } from 'services/webhook';
import { useSessionContext } from 'contexts/SessionContext';

import styles from './styles.module.css';

const formatCount = (n: number) =>
  n === 0 ? '' : n > 9 ? '9+' : n.toString();

const Item = ({
  webhook,
  isSelected,
  isActive,
  handleClick,
  handleDelete,
}: {
  webhook: Webhook;
  isSelected: boolean;
  isActive: boolean;
  handleClick: (
    webhook: Webhook,
    ctrlKey: boolean,
    shiftKey: boolean,
  ) => void;
  handleDelete: (webhookId: string | string[]) => void;
}) => {
  const { me, forwardingIds } = useSessionContext();

  const label = `[${dayjs(webhook.createdAt.toDate()).format(
    'MMM DD, YYYY HH:mm',
  )}] ${webhookDescription(webhook)}`;

  return (
    <div
      className={`
      ${styles.item} 
      ${
        isActive
          ? isSelected
            ? styles.activeSelected
            : styles.activeNotSelected
          : ''
      }
      ${isSelected ? styles.selected : ''} 
      ${webhook.reads[me.id] ? '' : styles.unread}`}
      onClick={e => {
        handleClick(webhook, e.ctrlKey, e.shiftKey);
      }}
    >
      <div className={styles.label}>{label}</div>
      <div className={styles.badges}>
        {forwardingIds.includes(webhook.id) ? (
          <ForwardingBadges />
        ) : (
          <IdleBadges
            myForwardSuccessCount={
              webhook.forwards.filter(
                f => f.success && f.userId === me.id,
              ).length
            }
            myForwardErrorCount={
              webhook.forwards.filter(
                f => !f.success && f.userId === me.id,
              ).length
            }
            otherForwardSuccessCount={
              webhook.forwards.filter(
                f => f.success && f.userId !== me.id,
              ).length
            }
            otherForwardErrorCount={
              webhook.forwards.filter(
                f => !f.success && f.userId !== me.id,
              ).length
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
  myForwardSuccessCount,
  myForwardErrorCount,
  otherForwardSuccessCount,
  otherForwardErrorCount,
  handleDelete,
}: {
  myForwardSuccessCount: number;
  myForwardErrorCount: number;
  otherForwardSuccessCount: number;
  otherForwardErrorCount: number;
  handleDelete: () => void;
}) => {
  return (
    <>
      {myForwardSuccessCount > 0 && (
        <span className="badge badge-success">
          {formatCount(myForwardSuccessCount)}
        </span>
      )}{' '}
      {otherForwardSuccessCount > 0 && (
        <span className="badge badge-success">
          <PeopleIcon />
          {formatCount(otherForwardSuccessCount)}
        </span>
      )}{' '}
      {myForwardErrorCount > 0 && (
        <span className="badge badge-danger">
          {formatCount(myForwardErrorCount)}
        </span>
      )}{' '}
      {otherForwardErrorCount > 0 && (
        <span className="badge badge-danger">
          <PeopleIcon />
          {formatCount(otherForwardErrorCount)}
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
