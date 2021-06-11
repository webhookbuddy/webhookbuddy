import { useHistory, useParams } from 'react-router-dom';
import useStreamDocuments from 'hooks/useStreamDocuments';
import { Webhook } from 'types/Webhook';
import Error from 'components/Error';
import Header from 'components/Header';
import Body from './Body';

import styles from './styles.module.css';
import { DashboardProvider } from 'contexts/DashboardContext';
import { useWorkspaceContext } from 'contexts/WorkspaceContext';

const Dashboard = () => {
  const {
    endpointId,
  }: {
    endpointId: string;
  } = useParams();
  const history = useHistory();

  const {
    documents: webhooks,
    loading: webhooksLoading,
    error: webhooksError,
  } = useStreamDocuments<Webhook>(
    `endpoints/${endpointId}/webhooks`,
    undefined,
    { fieldPath: 'createdAt', direction: 'desc' },
    1000,
  );

  const { endpoints } = useWorkspaceContext();
  const endpoint = endpoints.find(e => e.id === endpointId);
  if (!endpoint)
    return (
      <div className="super-center">
        <Error message="This page is gone or it never existed.">
          <button
            className="btn btn-primary mt-3"
            onClick={() => history.replace('/')}
          >
            Take me somewhere safe
          </button>
        </Error>
      </div>
    );

  return (
    <DashboardProvider
      endpoint={endpoint}
      webhooks={webhooks}
      webhooksLoading={webhooksLoading}
      webhooksError={webhooksError}
    >
      <div className={styles.dashboard}>
        <Header title={endpoint.name} backTo="/" />
        <Body />
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
