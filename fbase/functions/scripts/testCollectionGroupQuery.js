// Set credentials:
// Windows: $env:GOOGLE_APPLICATION_CREDENTIALS='../keys/webhookbuddy-dev-firebase-auth-firestore-admin.json'
// macOS: export GOOGLE_APPLICATION_CREDENTIALS='../keys/webhookbuddy-dev-firebase-auth-firestore-admin.json'
// node scripts/testCollectionGroupQuery.js

// Cloud Firestore
const admin = require('firebase-admin');
admin.initializeApp({ projectId: 'webhookbuddy-dev' });
const db = admin.firestore();

(async function () {
  const endpointStats = await db
    .collectionGroup('endpointStats')
    .where('totalWebhooks', '>', 500)
    .get();

  console.log('result', endpointStats.size);
})();
