/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, ipcMain, Tray } from 'electron';
import Store from 'electron-store';
import {
  updateTrayMenu,
  updateTrayTitle,
  buildTray,
  getTraySubMenuOnProgress,
} from './tray';
import {
  hanndleLaunchAtLogin,
  isActiveAppZone,
  calculateWorkElapsedMins,
  calculateTimeProgress,
} from './util';

const store = new Store();
let tray: Tray | null = null;
let intervalId: any = null;
const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');
const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

async function calculateUpdateProgress(
  newSettings = store.get('settings-data'),
) {
  console.log('in calculateUpdateProgress: ', newSettings);
  hanndleLaunchAtLogin(app, newSettings);
  const isDayProgressActive = isActiveAppZone(newSettings);
  let newTitleOfApp = '';
  let progress = null;
  if (isDayProgressActive) {
    const { totalWorkMinutes, elapsedMinutes } =
      calculateWorkElapsedMins(newSettings);
    progress = calculateTimeProgress(totalWorkMinutes, elapsedMinutes);
    //  @ts-ignore
    newTitleOfApp = progress[newSettings?.menubar?.text] || '';
  }
  //  @ts-ignore
  updateTrayTitle(tray, newTitleOfApp);
  const traySubMenu = getTraySubMenuOnProgress(isDayProgressActive, progress);

  //  @ts-ignore
  updateTrayMenu(tray, traySubMenu);
  return { isDayProgressActive };
}

// IPC listeners

// Elecron Store related IPC listeners
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});

// App related IPC listeners
ipcMain.on('settings-updated', async (event, arg) => {
  event.reply('settings-updated', 'Noted.');
  calculateUpdateProgress(arg);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

/**
 * App event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    clearInterval(intervalId);
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    tray = buildTray(getAssetPath('icons/24x24.png'));
    calculateUpdateProgress();
    // Set interval to update progress every minute
    intervalId = setInterval(() => {
      calculateUpdateProgress();
    }, 1 * 60000);
    if (app.dock) {
      app.dock.hide();
    }
    // app.on('activate', () => {
    //   // On macOS it's common to re-create a window in the app when the
    //   // dock icon is clicked and there are no other windows open.
    //   if (mainWindow === null) createWindow();
    // });
  })
  .catch(console.log);

app.on('will-quit', () => {
  clearInterval(intervalId); // Clear the interval when the app is about to quit
});
