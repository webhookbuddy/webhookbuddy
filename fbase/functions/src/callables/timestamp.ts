import * as functions from 'firebase-functions';

export const timestamp = functions.https.onCall(() => {
  return {
    now: Date.now(),
  };
});
