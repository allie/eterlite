import { BrowserWindow, clipboard } from 'electron';
import path from 'path';

const windowController = {
  window: null,

  init() {
    this.window = new BrowserWindow({
      width: 899,
      height: 622,
      minWidth: 899,
      minHeight: 622,
      backgroundColor: '#000000',
      title: 'Eterlite',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      const port = process.env.PORT || 1212;
      const url = new URL(`http://localhost:${port}`);
      url.pathname = 'index.html';
      this.window.webContents.loadURL(url.href);
    } else {
      this.window.webContents.loadURL(
        `file://${path.resolve(__dirname, '../renderer/', 'index.html')}`
      );
    }
  },

  captureScreenshot() {
    this.window.webContents
      .capturePage()
      .then((image) => {
        return clipboard.writeImage(image);
      })
      .catch((err) => {
        // TODO: handle this
      });
  },
};

export default windowController;
