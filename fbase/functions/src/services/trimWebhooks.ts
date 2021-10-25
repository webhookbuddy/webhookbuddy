import { db } from '../config/firebase';

export default async function trimWebhooks(
  endpointId: string,
  by: number,
) {
  const batch = db.batch();

  (
    await db
      .collection(`endpoints/${endpointId}/webhooks`)
      .orderBy('createdAt', 'asc')
      .limit(by)
      .get()
  ).docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}
