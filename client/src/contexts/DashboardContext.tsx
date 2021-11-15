import { createContext, ReactNode, useContext } from 'react';
import { Endpoint } from 'types/Endpoint';
import { Webhook } from 'types/Webhook';

const DashboardContext = createContext<
  | {
      endpoint: Endpoint;
      webhooks: Webhook[] | undefined;
      webhooksLoading: boolean;
      webhooksError: string | undefined;
    }
  | undefined
>(undefined);

const DashboardProvider = ({
  endpoint,
  webhooks,
  webhooksLoading,
  webhooksError,
  children,
}: {
  endpoint: Endpoint;
  webhooks: Webhook[] | undefined;
  webhooksLoading: boolean;
  webhooksError: string | undefined;
  children: ReactNode;
}) => {
  return (
    <DashboardContext.Provider
      value={{
        endpoint,
        webhooks,
        webhooksLoading,
        webhooksError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error(
      'useDashboardContext must be used within an DashboardProvider',
    );

  return context;
};

export { DashboardProvider, useDashboardContext };
