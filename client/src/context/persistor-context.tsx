import { createContext, useContext } from 'react';
import { CachePersistor } from 'apollo3-cache-persist';
import { NormalizedCacheObject } from '@apollo/client';

const PersistorContext = createContext<
  CachePersistor<NormalizedCacheObject>
>({} as CachePersistor<NormalizedCacheObject>);

const PersistorContextProvider = PersistorContext.Provider;
const usePersistorContext = () => useContext(PersistorContext);

export { PersistorContextProvider, usePersistorContext };
