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

## Environment

Use Node version 12+ (e.g. 12.16.1)

Sadly you need a Firebase account and an active project to use the Firebase emulator, even though you won't use Firebase nor the active project when running Webhook Buddy with the Firebase emulator.

- Install Firebase CLI: `npm install -g firebase-tools`
- Go to fbase directory: `cd fbase`
  - Log in to Firebase: `firebase login`
  - Open `.firebaserc` and replace the project ID with your project ID (it can be any) for alias `dev`
  - Set active project: `firebase use dev`
- Install Java (required for Firebase emulator). See tips in `fbase/README.md`.
- Install project dependencies: `npm run ci-all`

# Test

```
npm test
```

# Run

The following script will use the Firebase emulator as the server.
To use Firebase in the cloud, see instructions in `client/README.md`.

```
npm start
```

The Electron app will automatically open. If you prefer to run the app in a browser, navigate to http://localhost:3000/

The first time you run the app, the emulator database will be empty.
Use the Webhook Buddy Client to register a new user and you will be asked to verify your email.
The link to verify your email will appear in the terminal logs.

See `Seed Data` in `fbase/README.md` on instructions to save your data to use as seed for next time you run this project.

# More setup options:

- `client/README.md`
- `fbase/README.md`
