import React, {
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from 'schema/types';

type Context = {
  me: User | null;
  setMe: Dispatch<SetStateAction<User | null>>;
};

const UserContext = React.createContext<Context>({
  me: null,
  setMe: () => {},
}); // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37023#issuecomment-568299311

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ me, setMe }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('useMe must be used within a UserProvider');

  return context;
};

const useMe = () => useUserContext().me;
const useSetMe = () => useUserContext().setMe;

export { UserProvider, useMe, useSetMe };
