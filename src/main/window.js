import { BrowserWindow, clipboard, ipcMain } from 'electron';
import path from 'path';

const SIDEBAR_WIDTH = 320;

const windowController = {
  window: null,
  sidebarOpen: false,
  minWidth: 0, // minimum width including window decoration
  minHeight: 0, // minimum height including window decoration

  init() {
    this.window = new BrowserWindow({
      useContentSize: true,
      width: 899,
      height: 632,
      minWidth: 899,
      minHeight: 632,
      backgroundColor: '#000000',
      title: 'Eterlite',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    const [width, height] = this.window.getSize();
    this.minWidth = width;
    this.minHeight = height;

    ipcMain.on('sidebar', (event, isOpen) => {
      const [cw, ch] = this.window.getContentSize();
      if (isOpen && !this.sidebarOpen) {
        this.window.setContentSize(cw + SIDEBAR_WIDTH, ch);
        this.window.setMinimumSize(
          this.minWidth + SIDEBAR_WIDTH,
          this.minHeight
        );
      } else if (!isOpen && this.sidebarOpen) {
        const [w, h] = this.window.getSize();
        this.window.setMinimumSize(this.minWidth, this.minHeight);
        this.window.setSize(w - SIDEBAR_WIDTH, h);
      }
      this.sidebarOpen = isOpen;
    });

    ipcMain.on('fullscreen', (event, fullscreen) => {
      this.window.setFullScreen(fullscreen);
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
