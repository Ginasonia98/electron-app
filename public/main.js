/* eslint-disable global-require */

const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    minWidth: 800,
    maxWidth: 800,
    height: 800,
    minHeight: 800,
    maxHeight: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.removeMenu();
  require('@electron/remote/main').enable(win.webContents);

  win.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  );
  // unable the code below to show the inspect element
  // win.webContents.openDevTools();
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
