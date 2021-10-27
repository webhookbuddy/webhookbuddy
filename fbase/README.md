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
