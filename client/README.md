# Webhook Buddy Client

Electron desktop app with React.js (via Create React App)

Initial configuration inspired by: https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

Distribution setup inspired by:

- https://medium.com/how-to-electron/a-complete-guide-to-packaging-your-electron-app-1bdc717d739f
- https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3

# Setup

## VS Code

Install `Prettier - Code formatter` extension. Prettier will automatically format files on save.

## Environment

- Use Node version 12+ (e.g. 12.16.1)
  - `npm install`

# Run

- Get server running with `Quick Start` instructions here: [webhookbuddy-server](https://github.com/webhookbuddy/webhookbuddy-server)
- `npm start` (Runs both Electron and React app)
- `npm run electron` (Runs only Electon. Useful if you want to see console.log() output, but electron needs to be installed globally.)
- `npm run react-start` (Runs only React app. Needed if you use `npm run electron`.)

# Distribution

- `npm run dist`
- Distribution package for current environment will be in `dist` folder
