import { useCallback, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

function useStreamDocument<T extends { id: string }>(
  collection: string,
  id: string,
) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | undefined;
    document: T | undefined | null;
  }>({ loading: true, error: undefined, document: undefined });

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setState(prev => ({ ...prev, loading: true, error: undefined }));
    let unsubscribed = false;
    const unsubscribe = onSnapshot(
      doc(db, collection, id),
      snap => {
        if (unsubscribed) return;

        if (!snap.exists)
          setState(prev => ({
            ...prev,
            error: `Document not found!`,
            loading: false,
            document: null,
          }));
        else
          setState(prev => ({
            ...prev,
            error: undefined,
            loading: false,
            document: { ...snap.data(), id: snap.id } as T,
          }));
      },
      error => {
        if (unsubscribed) return;
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false,
          document: null,
        }));
      },
    );

    return () => {
      unsubscribe();
      unsubscribed = true;
    };
  }, [collection, id, setState, retryCount]);

  const retry = useCallback(
    () => setRetryCount(prev => prev + 1),
    [setRetryCount],
  );

  return {
    document: state.document,
    error: state.error,
    loading: state.loading,
    retry,
  };
}

export default useStreamDocument;
