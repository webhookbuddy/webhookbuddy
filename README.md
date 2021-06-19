# Webhook Buddy

# Setup

## VS Code

Install `Prettier - Code formatter` extension. Prettier will automatically format files on save.

## Environment

Use Node version 12+ (e.g. 12.16.1)

```
cd fbase/functions
npm ci
```

```
cd fbase
npm ci
npm run build
```

```
cd client
npm ci
```

# Test

```
cd fbase
npm test
```

# Run

## Emulator

```
cd fbase
npm start
```

## Client

### With emulator

Runs both Electron and React app

```
cd client
npm start
```

### With Firebase in the cloud

Runs both Electron and React app

```
cd client
npm run start:dev
```

### Run Electron and React separately

- `npm run electron` (Runs only Electon. Useful if you want to see console.log() output, but electron needs to be installed globally.)
- `npm run react-start` (Runs only React app. Needed if you use `npm run electron`.)

# Distribution

- `cd client`
- `npm run dist`
- Distribution package for current environment will be in `dist` folder
