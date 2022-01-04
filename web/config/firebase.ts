import * as admin from 'firebase-admin';

// initializeApp looks for service account credentials in GOOGLE_APPLICATION_CREDENTIALS environment variable
// and determines which Firebase project we're using
if (!admin.apps.length) admin.initializeApp();

export const db = admin.firestore();
export const functionsUrl = process.env.FIREBASE_FUNCTIONS_URL;
