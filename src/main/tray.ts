import { app, Tray, Menu, nativeImage, BrowserWindow } from 'electron';

export default class TrayBuilder {
  mainWindow: BrowserWindow;

  iconPath: string;

  constructor(mainWindow: BrowserWindow, iconPath: string) {
    this.mainWindow = mainWindow;
    this.iconPath = iconPath;
  }

  // Function to toggle the main window
  toggleWindow = () => {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.show();
    }
  };

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
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(contextMenu);

    tray.setToolTip('This is my application');
    tray.setTitle('8h 7m');

    return tray;
  }
}

export const updateTrayIcon = (tray: Tray, imgPath: string) => {
  tray.setImage(imgPath);
};
