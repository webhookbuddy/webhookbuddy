import { initializeApp } from 'firebase/app';
// Need to import use*Emulator without the 'use' part, otherwise React will think it's a hook
import {
  getAuth,
  useAuthEmulator as authEmulator,
} from 'firebase/auth';
import {
  getFirestore,
  useFirestoreEmulator as firestoreEmulator,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import {
  getFunctions,
  useFunctionsEmulator as functionsEmulator,
} from 'firebase/functions';

const emulate = window.location.hostname === 'localhost';

var firebaseConfig = emulate
  ? { apiKey: 'emulator', projectId: 'webhook-buddy-dev' }
  : {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

if (emulate) {
  authEmulator(auth, 'http://localhost:9099');
  firestoreEmulator(db, 'localhost', 8080);
  functionsEmulator(functions, 'localhost', 5001);
}

enableIndexedDbPersistence(db);

export { auth, db, functions };
