# Webhook Buddy Client

Electron desktop app with React.js (via Create React App)

Initial configuration inspired by: https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

Distribution setup inspired by:

- https://medium.com/how-to-electron/a-complete-guide-to-packaging-your-electron-app-1bdc717d739f
- https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3

## Run

### Use Firebase emulator

Runs both Electron and React app

```
npm start
```

### Use Firebase in the cloud

Copy `.env.sample` and save as `.env.development.local`.
Create a Firebase project and populate `.env.development.local` with settings from Firebase Console's project settings page.

Runs both Electron and React app

```
npm run start:dev
```

### Run Electron and React separately

- `npm run electron` (Runs only Electon. Useful if you want to see console.log() output, but electron needs to be installed globally.)
- `npm run react-start` (Runs only React app. Needed if you use `npm run electron`.)

# Distribution

- `npm run dist`
- Distribution package for current environment will be in `dist` folder
