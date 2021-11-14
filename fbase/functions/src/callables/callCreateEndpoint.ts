import * as functions from 'firebase-functions';
import createEndpoint from '../services/createEndpoint';

export const callCreateEndpoint = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.uid)
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Unauthorized!',
      );

    if (
      !data.name ||
      typeof data.name !== 'string' ||
      !data.name.trim()
    )
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Endpoint name missing.',
      );

    try {
      return await createEndpoint(context.auth.uid, data.name);
    } catch (error) {
      throw new functions.https.HttpsError(
        'unknown',
        error.message,
        error,
      );
    }
  },
);
