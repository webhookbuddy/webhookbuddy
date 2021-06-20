import * as functions from 'firebase-functions';
import deleteCollection from '../services/deleteCollection';

export const onEndpointDelete = functions.firestore
  .document('endpoints/{endpointId}')
  .onDelete((_snap, context) => {
    return deleteCollection(
      `endpoints/${context.params.endpointId}/webhooks`,
      100,
    );
  });
