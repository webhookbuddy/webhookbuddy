import { useState } from 'react';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { GET_ENDPOINTS } from 'schema/queries';
import { WEBHOOK_FRAGMENT } from 'schema/fragments';
import { Webhook } from 'schema/types';
import { GetEndpoints } from 'schema/types/GetEndpoints';
import Error from 'components/Error';
import useForwardUrls from 'hooks/useForwardUrls';
import Autosuggest, {
  AutosuggestPositionEnum,
} from 'components/Autosuggest';
import useForwarder from 'hooks/useForwarder';
import styles from './styles.module.css';
import { AutoForwarderWebhookCreated } from './types/AutoForwarderWebhookCreated';

const WEBHOOK_CREATED = gql`
  subscription AutoForwarderWebhookCreated($endpointId: ID!) {
    webhookCreated(endpointId: $endpointId) {
      webhook {
        ...Webhook
      }
    }
  }
  ${WEBHOOK_FRAGMENT}
`;

const AutoForwarder = ({ docked }: { docked: Boolean }) => {
  const { data, error, loading, refetch } = useQuery<GetEndpoints>(
    GET_ENDPOINTS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const [endpointId, setEndpointId] = useState('');
  const [running, setRunning] = useState(false);
  const { forwardUrls } = useForwardUrls(endpointId);
  const [url, setUrl] = useState('');
  const { forwardWebhook } = useForwarder(endpointId);

  useSubscription<AutoForwarderWebhookCreated>(WEBHOOK_CREATED, {
    variables: { endpointId, url },
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (!data) return;
      const forwardTo = (url: string) => {
        forwardWebhook(url, [data.webhookCreated.webhook as Webhook]);
      };
      if (running) forwardTo(url);
    },
  });

  const retry = () => refetch().catch(() => {}); // Unless we catch, a network error will cause an unhandled rejection: https://github.com/apollographql/apollo-client/issues/3963

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
            className={`fa fa-play fa-lg pointer ${styles.idleIcon}`}
            onClick={() => setRunning(true)}
          ></i>
        )}
      </div>
      <div className="form-group">
        <label>Endpoint</label>
        {error ? (
          <div style={{ fontSize: '10px' }}>
            <Error error="">
              <button
                className="btn btn-primary btn-sm"
                onClick={retry}
              >
                Try again!
              </button>
            </Error>
          </div>
        ) : (
          <select
            className="custom-select custom-select-sm"
            onChange={e => setEndpointId(e.target.value)}
            defaultValue={'DEFAULT'}
            disabled={running}
          >
            <option value="DEFAULT" disabled>
              Choose an endpoint
            </option>
            {data &&
              !loading &&
              data?.endpoints.map(endpoint => (
                <option key={endpoint.id} value={endpoint.id}>
                  {endpoint.name}
                </option>
              ))}
          </select>
        )}
      </div>
      <div className="form-group">
        <label>Auto-forward to</label>
        <Autosuggest
          type="url"
          placeholder="Forward to URL (e.g. http://localhost:8000/send-webhook-here)"
          userInput={url}
          setUserInput={setUrl}
          suggestions={forwardUrls}
          position={AutosuggestPositionEnum.Up}
          disabled={running}
        />
      </div>
    </div>
  );
};

export default AutoForwarder;
