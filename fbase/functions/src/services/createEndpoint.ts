import { admin, db } from '../config/firebase';
import { customAlphabet } from 'nanoid';

// Remove - and _ characters but bump the length from 21 to 22.
// This changes the number of years needed from 149 billion to 842 billion for a 1% collision probability creating 1000 IDs per hour.
// https://zelark.github.io/nano-id-cc/
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  22,
);

export default async (userId: string, name: string) => {
  const userSnap = await db.doc(`users/${userId}`).get();
  const user = userSnap.data();
  if (!userSnap.exists || !user) throw new Error('User not found.');

  return await db.collection('endpoints').add({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    name: name,
    referenceId: nanoid(),
    users: {
      [userId]: {
        exists: true,
        role: 'Admin',
        id: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    },
    forwardUrls: {},
  });
};
