# Setup

```
npm install -g firebase-tools
```

## Java needs to be installed to run the Firebase emulator

macOS: `brew install java`, then add the following to `.bash_profile`

```
export PATH="/usr/local/opt/openjdk/bin:$PATH"

```

Windows:

```
scoop bucket add java
scoop install openjdk
```

# Seed Data

Export

```
firebase emulators:export exports/<foldername>
```

Import

```
firebase emulators:start --import exports/<foldername>
```

# Trigger Pubsub

```
firebase functions:shell
firebase > limitWebhooks()
```

# Firestore indexes

Limits: https://firebase.google.com/docs/firestore/query-data/index-overview#index_limitations

Explanation of indexes in `firestore.indexes.json`:

## Composite Indexes

- endpointStats: totalwebhooks Ascending
  - For collection group query in tasks/limitWebhooks.ts

## Single Field Indexes

- None

# Run Cloud Scripts Locally

- Create an GCP IAM Service Account with the following permissions:
  - Cloud Datastore Owner
  - Firebase Authentication Admin
- Generate a JSON key file and store it in keys folder
- Create a JS script file in functions/scripts (e.g. functions/scripts/foo.js)
- `cd` into functions folder
- Execute it as follow:

Windows

```
$env:GOOGLE_APPLICATION_CREDENTIALS='../keys/key-file.json'
```

macOS

```
export GOOGLE_APPLICATION_CREDENTIALS='../keys/key-file.json'
```

Windows & macOS

```
node scripts/foo.js
```
