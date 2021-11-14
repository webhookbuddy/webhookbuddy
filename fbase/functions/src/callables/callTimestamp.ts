import * as functions from 'firebase-functions';

export const callTimestamp = functions.https.onCall(() => {
  return {
    now: Date.now(),
  };
});
