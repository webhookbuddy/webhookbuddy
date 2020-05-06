import React, {
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type Context = {
  me: Me | null;
  setMe: Dispatch<SetStateAction<Me | null>>;
};

export type Me = {
  id: number;
};

const UserContext = React.createContext<Context>({
  me: null,
  setMe: () => {},
}); // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37023#issuecomment-568299311

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<Me | null>(null);

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
