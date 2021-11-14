import * as functions from 'firebase-functions';
import { admin } from '../config/firebase';

const setEmail = async (
  snapshot: functions.firestore.QueryDocumentSnapshot,
) => {
  const userId = snapshot.id;
  const user = await admin.auth().getUser(userId);
  return snapshot.ref.set({ email: user.email }, { merge: true });
};

export const onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate(snapshot => setEmail(snapshot));
