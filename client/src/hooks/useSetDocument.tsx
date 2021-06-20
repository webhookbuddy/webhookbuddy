import { useCallback } from 'react';
import { db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export type SetDocumentFunction = (
  id: string,
  payload: any,
  onError?: (message: string) => void,
  onSuccess?: () => void,
) => void;

const useSetDocument = (collection: string) => {
  const setDocument: SetDocumentFunction = useCallback(
    (
      id: string,
      payload: any,
      onError?: (message: string) => void,
      onSuccess?: () => void,
    ) => {
      setDoc(doc(db, collection, id), payload, { merge: true })
        .then(() => {
          if (onSuccess) onSuccess();
        })
        .catch(error => {
          if (onError) onError(error.message);
        });
    },
    [collection],
  );

  return {
    setDocument,
  };
};

export default useSetDocument;
