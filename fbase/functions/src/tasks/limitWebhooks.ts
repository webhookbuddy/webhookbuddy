import * as functions from 'firebase-functions';
import { db } from '../config/firebase';
import trimWebhooks from '../services/trimWebhooks';

const MAX_WEBHOOKS = 500;

// Trim webhooks on schedule instead of on-demand to prevent race conditions.
// Race conditions occurred when many webhooks came in at once for an endpoint (e.g. on Stripe subscription create) and each webhooks triggered a batch webhook deletion.

export const limitWebhooks = functions
  .runWith({
    timeoutSeconds: 300,
  })
  .pubsub.schedule('*/30 * * * *') // Every 30 minutes: https://crontab.guru/every-30-minutes
  .onRun(async () => {
    const endpointStats = await db
      .collectionGroup('endpointStats')
      .where('totalWebhooks', '>', MAX_WEBHOOKS)
      .get();

    return Promise.all(
      endpointStats.docs.map(doc => {
        const endpointId = doc.ref.parent.parent?.id;
        if (endpointId)
          return trimWebhooks(
            endpointId,
            doc.data().totalWebhooks - MAX_WEBHOOKS,
          );
        else return null;
      }),
    );
  });
