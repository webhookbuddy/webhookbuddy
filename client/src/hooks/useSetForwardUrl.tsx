import { db } from 'config/firebase';
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { User } from 'types/User';

const useSetForwardUrl = (me: User, endpointId: string) => {
  const addForwardUrl = useCallback(
    (url: string) => {
      setDoc(
        doc(db, `endpoints/${endpointId}`),
        {
          forwardUrls: {
            [me.id]: arrayUnion(url),
          },
        },
        { merge: true },
      );
    },
    [me.id, endpointId],
  );

  const removeForwardUrl = useCallback(
    (url: string) => {
      setDoc(
        doc(db, `endpoints/${endpointId}`),
        {
          forwardUrls: {
            [me.id]: arrayRemove(url),
          },
        },
        { merge: true },
      );
    },
    [me.id, endpointId],
  );

  return { addForwardUrl, removeForwardUrl };
};

export default useSetForwardUrl;
