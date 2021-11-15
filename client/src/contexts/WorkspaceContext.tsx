import { createContext, ReactNode, useContext } from 'react';
import { Endpoint } from 'types/Endpoint';

const WorkspaceContext = createContext<
  { endpoints: Endpoint[] } | undefined
>(undefined);

const WorkspaceProvider = ({
  endpoints,
  children,
}: {
  endpoints: Endpoint[];
  children: ReactNode;
}) => {
  return (
    <WorkspaceContext.Provider value={{ endpoints }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);
  if (context === undefined)
    throw new Error(
      'useWorkspaceContext must be used within an WorkspaceProvider',
    );

  return context;
};

export { WorkspaceProvider, useWorkspaceContext };
