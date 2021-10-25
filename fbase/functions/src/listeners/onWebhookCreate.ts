import * as functions from 'firebase-functions';
import limitWebhooks from '../services/limitWebhooks';

export const onWebhookCreate = functions.firestore
  .document('endpoints/{endpointId}/webhooks/{webhookId}')
  .onCreate((_snapshot, context) => {
    return limitWebhooks(context.params.endpointId);
  });
