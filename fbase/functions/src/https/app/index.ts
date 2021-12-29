import * as functions from 'firebase-functions';
import * as express from 'express';
import { subscribe, unsubscribe } from './middlewares/unsubscribes';
import authUser from './middlewares/authUser';
import { acceptInvite } from './middlewares/acceptInvite';

const application = express();

// Path without /app prefix is required for this scenario:
// - When calling function directly. Example: https://us-central1-webhookbuddy-dev.cloudfunctions.net/app/unsubscribes
// Path with /app prefix is required for these 2 scenarios:
// - Proxying through Firebase hosting. Example: /app/unsubscribe with  { "source": "/app/**", "function": "app" } in firebase.json
// - When proxying through Create React app using "proxy": "https://us-central1-webhookbuddy-dev.cloudfunctions.net/app" in package.json
// Source: https://github.com/firebase/firebase-functions/issues/191

application.put(['/unsubscribes', '/app/unsubscribes'], unsubscribe);
application.delete(['/unsubscribes', '/app/unsubscribes'], subscribe);
application.get(['/authuser', '/app/authuser'], authUser);
application.put(
  ['/invites/newuser', '/app/invites/newuser'],
  acceptInvite(true),
);
application.put(
  ['/invites/existinguser', '/app/invites/existinguser'],
  acceptInvite(false),
);

export const app = functions
  .runWith({
    timeoutSeconds: 5 * 60, // The default 60 seconds wasn't enough for /api/attemptResults/canvasGradebookCsv
  })
  .https.onRequest(application);
