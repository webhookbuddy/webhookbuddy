import * as functions from 'firebase-functions';
import { admin, db } from '../config/firebase';

export const onWebhookWrite = functions.firestore
  .document('endpoints/{endpointId}/webhooks/{webhookId}')
  .onWrite(async (change, context) => {
    const endpoint = await db
      .doc(`endpoints/${context.params.endpointId}`)
      .get();

    // Ignore background task taht deletes all webhooks when an endpoint is deleted
    if (!endpoint.exists) return null;

    // Inspired by: https://stackoverflow.com/a/49407570/188740

    if (!change.before.exists)
      return endpoint.ref.set(
        {
          webhookCount: admin.firestore.FieldValue.increment(1),
        },
        { merge: true },
      );

    if (!change.after.exists) {
      return endpoint.ref.set(
        {
          webhookCount: admin.firestore.FieldValue.increment(-1),
        },
        { merge: true },
      );
    }

    return null;
  });
