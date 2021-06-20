import { useState } from 'react';
import { createContext, ReactNode, useContext } from 'react';
import { User } from 'types/User';

const SessionContext =
  createContext<
    | {
        me: User;
        forwardingIds: string[];
        setForwardingIds: React.Dispatch<
          React.SetStateAction<string[]>
        >;
      }
    | undefined
  >(undefined);

const SessionProvider = ({
  me,
  children,
}: {
  me: User;
  children: ReactNode;
}) => {
  const [forwardingIds, setForwardingIds] = useState<string[]>([]);

  return (
    <SessionContext.Provider
      value={{ me, forwardingIds, setForwardingIds }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (context === undefined)
    throw new Error(
      'useSessionContext must be used within an SessionProvider',
    );

  return context;
};

export { SessionProvider, useSessionContext };
