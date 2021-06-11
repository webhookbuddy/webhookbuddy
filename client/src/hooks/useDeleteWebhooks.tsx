import { db } from 'config/firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { useCallback } from 'react';

const useDeleteWebhooks = (endpointId: string) => {
  const deleteWebhooks = useCallback(
    (
      ids: string[],
      onError?: (message: string) => void,
      onSuccess?: () => void,
    ) => {
      const batch = writeBatch(db);
      ids.forEach(id => {
        batch.delete(
          doc(db, 'endpoints', endpointId, 'webhooks', id),
        );
      });

      batch
        .commit()
        .then(() => {
          if (onSuccess) onSuccess();
        })
        .catch(error => {
          if (onError) onError(error.message);
        });
    },
    [endpointId],
  );

  return {
    deleteWebhooks,
  };
};

export default useDeleteWebhooks;
