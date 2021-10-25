import { db } from '../config/firebase';

const MAX_WEBHOOKS = 500;

export default async function limitWebhooks(endpointId: string) {
  const stats = await db
    .doc(`endpoints/${endpointId}/endpointStats/index`)
    .get();

  const totalWebhooks: number = stats.data()?.totalWebhooks ?? 0;

  const deleteCount = totalWebhooks - MAX_WEBHOOKS;

  if (deleteCount <= 0) return null;

  const batch = db.batch();

  (
    await db
      .collection(`endpoints/${endpointId}/webhooks`)
      .orderBy('createdAt', 'asc')
      .limit(deleteCount)
      .get()
  ).docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}
