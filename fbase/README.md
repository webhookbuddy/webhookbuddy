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
