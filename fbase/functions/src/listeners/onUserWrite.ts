import * as functions from 'firebase-functions';
import { db } from '../config/firebase';

const updateEndpointUsers = async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
) => {
  if (!change.after.exists) return null;

  const user = change.after.data();
  if (!user) return null;
  const userId = change.after.id;

  const endpoints = await db
    .collection('endpoints')
    .where(`users.${userId}.exists`, '==', true)
    .get();

  const batch = db.batch();
  endpoints.docs.forEach(endpoint => {
    batch.set(
      endpoint.ref,
      {
        users: {
          [userId]: {
            exists: true,
            id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      },
      { merge: true },
    );
  });

  return batch.commit();
};

export const onUserWrite = functions.firestore
  .document('users/{userId}')
  .onWrite(change => updateEndpointUsers(change));
