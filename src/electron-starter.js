const { app, net, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

// Disable warnings for:
// - Disabled webSecurity
// - allowRunningInsecureContent
// - Insecure Content-Security-Policy
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

ipcMain.on('http-request', (event, { url, webhook, reference }) => {
  const request = net.request({
    method: webhook.method,
    url,
  });

  // TODO: can't seem to remove these default headers using request.removeHeader():
  // Proxy-Connection
  // Sec-Fetch-Site
  // Sec-Fetch-Mode
  // Accept-Language

  webhook.headers
    .filter(
      header =>
        !['content-length', 'host'].some(
          blacklist => blacklist === header.key.toLowerCase(),
        ),
    )
    .forEach(header => request.setHeader(header.key, header.value));

  request.on('response', response => {
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () =>
      event.sender.send('http-request-completed', {
        reference,
        webhook,
        data,
        headers: response.headers,
        statusCode: response.statusCode,
      }),
    );
  });
  request.end(webhook.body);
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  // In dev, load React app served by create-react-app.
  // In production, load built index.html.
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
