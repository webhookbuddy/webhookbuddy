import { useEffect, useState } from 'react';
import useForwarder from 'hooks/useForwarder';
import { useSessionContext } from 'contexts/SessionContext';
import { Webhook } from 'types/Webhook';
import { db } from 'config/firebase';
import {
  collection,
  query,
  onSnapshot,
  where,
  Timestamp,
} from 'firebase/firestore';
import AutoForwardSuggest from './AutoForwardSuggest';
import AutoForwardDropdown from './AutoForwardDropdown';
import { useWorkspaceContext } from 'contexts/WorkspaceContext';
import useLazyCallFunction from 'hooks/useLazyCallFunction';
import { Endpoint } from 'types/Endpoint';

import styles from './styles.module.css';

const AutoForwarder = ({ docked }: { docked: Boolean }) => {
  const { me } = useSessionContext();
  const { endpoints } = useWorkspaceContext();
  const [endpointId, setEndpointId] = useState('');
  const [endpoint, setEndpoint] = useState<Endpoint | undefined>();
  const [url, setUrl] = useState('');
  const [running, setRunning] = useState(false);
  const { forwardWebhook } = useForwarder(me, endpointId);
  const { call } =
    useLazyCallFunction<{ now: number }>('calltimestamp');

  useEffect(() => {
    if (!endpoint || !url || !running) return;

    let firstSnapshot = true;
    let unloaded = false;
    let unsubscribe = () => {};

    call(
      {},
      ({ now }) => {
        if (unloaded) return;

        unsubscribe = onSnapshot(
          query(
            collection(db, `endpoints/${endpoint.id}/webhooks`),
            where('createdAt', '>', Timestamp.fromMillis(now)),
          ),
          snap => {
            // The first query snapshot contains added events for all existing documents that match the query, so ignore those.
            if (firstSnapshot) {
              firstSnapshot = false;
              return;
            }

            snap.docChanges().forEach(change => {
              if (change.type !== 'added') return;

              forwardWebhook(url, endpoint, [
                {
                  ...change.doc.data(),
                  id: change.doc.id,
                } as Webhook,
              ]);
            });
          },
        );
      },
      () => setRunning(false),
    );

    return () => {
      unloaded = true;
      unsubscribe();
    };
  }, [endpoint, running, setRunning, url, call, forwardWebhook]);

  useEffect(() => {
    if (endpointId)
      setEndpoint(endpoints.find(e => e.id === endpointId));
    else setEndpoint(undefined);
  }, [endpoints, endpointId, setEndpoint]);

  return (
    <div
      className={`${styles.autoForwarder} ${
        docked ? styles.docked : ''
      }`}
    >
      <div className={`${styles.iconWrapper}`}>
        {running ? (
          <i
            className={`fa fa-circle fa-2x pointer ${styles.runningIcon}`}
            onClick={() => setRunning(false)}
          ></i>
        ) : (
          <i
            className={`fa fa-play fa-2x pointer ${styles.idleIcon}`}
            onClick={() => {
              if (endpointId && url.trim()) setRunning(true);
            }}
          ></i>
        )}
      </div>
      <AutoForwardDropdown
        setEndpointId={setEndpointId}
        running={running}
        endpoints={endpoints}
      />
      {endpoint && (
        <AutoForwardSuggest
          url={url}
          endpoint={endpoint}
          setUrl={setUrl}
          running={running}
        />
      )}
    </div>
  );
};

export default AutoForwarder;
