import { app, Tray, Menu, nativeImage, BrowserWindow, shell } from 'electron';
import toggleWindow from './settingsWindow';

export default class TrayBuilder {
  mainWindow: BrowserWindow;

  iconPath: string;

  constructor(mainWindow: BrowserWindow, iconPath: string) {
    this.mainWindow = mainWindow;
    this.iconPath = iconPath;
  }

  buildTray(): Tray {
    const icon = nativeImage.createFromPath(this.iconPath);
    const tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: this.mainWindow.isVisible() ? 'Hide ERB' : 'Open ERB',
        click: this.toggleWindow,
      },
      { type: 'separator' },
      {
        label: 'Settings',
        accelerator: 'Command+,',
        click: () => {
          this.toggleWindow();
        },
      },
      { type: 'separator' },
      {
        label: 'Send Feedback/Requests',
        click: () => shell.openExternal('https://rishabhgarg.me'),
      },
      {
        label: 'Support my work',
        click: () =>
          shell.openExternal('https://www.buymeacoffee.com/rishabhgarg'),
      },
      { type: 'separator' },

      {
        label: 'Quit Better Day Progress',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(contextMenu);

    // tray.setToolTip('This is my application');
    // tray.setTitle('8h 7m');

    return tray;
  }
}

export const buildTray = (imgPath: string) => {
  return new Tray(imgPath);
};
export const updateTrayIcon = (tray: Tray, imgPath: string) => {
  tray.setImage(imgPath);
};
export const updateTrayTitle = (tray: Tray, title: string) => {
  if (tray.getTitle() !== title) {
    tray.setTitle(title);
  }
};

export function updateTrayMenu(tray: Tray, newContextMenu: any) {
  const contextMenu = Menu.buildFromTemplate([
    ...newContextMenu,
    { type: 'separator' },
    {
      label: 'Settings',
      accelerator: 'Command+,',
      click: toggleWindow,
    },
    { type: 'separator' },
    {
      label: 'Send Feedback/Requests',
      click: () => shell.openExternal('https://rishabhgarg.me'),
    },
    {
      label: 'Support my work',
      click: () =>
        shell.openExternal('https://www.buymeacoffee.com/rishabhgarg'),
    },
    { type: 'separator' },

    {
      label: 'Quit Better Day Progress',
      accelerator: 'Command+Q',
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}

export function getTraySubMenuOnProgress(
  isDayProgressActive: boolean,
  progress: any,
): { label: string; enabled: boolean }[] {
  if (!isDayProgressActive && !progress) {
    return [{ label: 'Inactive', enabled: false }];
  }
  return [
    { label: progress?.percentageOver, enabled: false },
    { label: `${progress?.timeLeft} left`, enabled: false },
  ];
}
