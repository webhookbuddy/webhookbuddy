# Webhook Buddy

Webhook Buddy source code includes:

- Webhook Buddy Electron client (`client`)
- Firebase
  - Firestore security rules (`fbase/firestore.rules`)
  - Firestore indexes (`fbase/firestore.indexes.json`)
  - Firestore functions (`fbase/functions`)

# Setup

## VS Code

Install `Prettier - Code formatter` extension. Prettier will automatically format files on save.

## Firebase Emulator Setup

Use Node version 12+ (e.g. 12.16.1)

Sadly you need a Firebase account and an active project to use the Firebase emulator, even though you won't use Firebase nor the active project when running Webhook Buddy with the Firebase emulator.

- Install Firebase CLI: `npm install -g firebase-tools`
- Go to fbase directory: `cd fbase`
  - Log in to Firebase: `firebase login`
  - Open `.firebaserc` and replace the project ID with your project ID (it can be any) for alias `dev`
  - Set active project: `firebase use dev`
- Install Java (required for Firebase emulator). See tips in `fbase/README.md`.
- Install project dependencies: `npm run ci-all`
- Initialize Firebase emulator: `npm run init`
- Save server state: `npm run save`
- Stop server: <kbd>CTRL</kbd>+<kbd>c</kbd>

# Test

```
npm test
```

# Run

```
npm start
```

The Electron app will automatically open. If you prefer to run the app in a browser, navigate to http://localhost:3000/

The first time you run the app, the emulator will be empty. To see the database, follow instructions here: https://github.com/webhookbuddy/webhookbuddy/wiki/Seed-Database

# More setup options:

- [client/README.md](https://github.com/webhookbuddy/webhookbuddy/tree/main/client)
- [fbase/README.md](https://github.com/webhookbuddy/webhookbuddy/tree/main/fbase)
