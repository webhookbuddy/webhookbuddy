import { db } from '../config/firebase';
import { useCallback } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';

const useDeleteDocument = (collection: string) => {
  const deleteDocument = useCallback(
    (
      id: string,
      onError?: (message: string) => void,
      onSuccess?: () => void,
    ) => {
      deleteDoc(doc(db, collection, id))
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
    deleteDocument,
  };
};

export default useDeleteDocument;
