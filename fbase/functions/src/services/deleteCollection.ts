import { admin, db } from '../config/firebase';

// Delete collection source: https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2

export default async function deleteCollection(
  collectionPath: string,
  batchSize: number,
) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(
  query: admin.firestore.Query<admin.firestore.DocumentData>,
  resolve: (value: unknown) => void,
) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve(null);
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick to avoid exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}
