import { useParams } from 'react-router-dom';
import Jumbotron from 'components/Jumbotron';
import Forwarder from './Forwarder';
import Tabs from './Tabs';
import Content from './Content';
import None from '../None';
import useForwarder from 'hooks/useForwarder';
import { useSessionContext } from 'contexts/SessionContext';
import { useDashboardContext } from 'contexts/DashboardContext';

const Some = () => {
  const { me } = useSessionContext();
  const { endpoint, webhooks } = useDashboardContext();
  const { forwardWebhook } = useForwarder(me, endpoint.id);

  const { webhookIds } = useParams<{ webhookIds: string }>();
  const ids = webhookIds.split(',');
  const selectedWebhooks =
    webhooks?.filter(w => ids.includes(w.id)) ?? [];

  const forwardTo = (url: string) =>
    forwardWebhook(url, endpoint, selectedWebhooks);

  return (
    <>
      {selectedWebhooks.length === 0 ? (
        <None />
      ) : selectedWebhooks.length === 1 ? (
        <>
          <Forwarder forwardTo={forwardTo} />
          <Tabs />
          <Content webhook={selectedWebhooks[0]} />
        </>
      ) : (
        <>
          <Forwarder forwardTo={forwardTo} />
          <Jumbotron>
            <div className="text-center">
              Multiple webhooks selected. Forward them all using the{' '}
              <strong>
                <em>Play</em>
              </strong>{' '}
              option above.
            </div>
          </Jumbotron>
        </>
      )}
    </>
  );
};

export default Some;
