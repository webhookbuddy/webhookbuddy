import { useCallback } from 'react';
import { functions } from 'config/firebase';
import { httpsCallable } from 'firebase/functions';

function useLazyCallFunction<T>(name: string) {
  const call = useCallback(
    (
      payload: any,
      onSuccess?: (doc: T) => void,
      onError?: (message: string) => void,
    ) => {
      let unloaded = false;
      httpsCallable(
        functions,
        name,
      )(payload).then(
        result => {
          if (unloaded) return;
          if (onSuccess) onSuccess(result.data as T);
        },
        error => {
          if (onError) onError(error.message);
        },
      );

      return () => {
        unloaded = true;
      };
    },
    [name],
  );

  return {
    call,
  };
}

export default useLazyCallFunction;
