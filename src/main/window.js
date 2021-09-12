import { BrowserWindow, clipboard, ipcMain } from 'electron';
import path from 'path';

const SIDEBAR_WIDTH = 320;

const windowController = {
  window: null,
  sidebarOpen: false,
  minWidth: 0, // minimum width including window decoration
  minHeight: 0, // minimum height including window decoration
  ready: false,

  init() {
    this.window = new BrowserWindow({
      autoHideMenuBar: true,
      show: false,
      useContentSize: true,
      width: 927,
      height: 632,
      minWidth: 927,
      minHeight: 675,
      backgroundColor: '#000000',
      title: 'Eterlite',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        backgroundThrottling: false,
      },
    });

    const [width, height] = this.window.getSize();
    this.minWidth = width;
    this.minHeight = height;

    ipcMain.on('sidebar', (event, isOpen) => {
      this.toggleSidebar(isOpen);
    });

    ipcMain.on('fullscreen', (event, fullscreen) => {
      this.window.setFullScreen(fullscreen);
    });

    ipcMain.on('screenshot', (event) => {
      this.captureScreenshot();
    });

    ipcMain.on('first-render', (event) => {
      this.ready = true;
      this.window.show();
    });

    // Close the sidebar on reload
    // TODO: Remove this and load sidebar state from config file instead
    this.window.webContents.on('did-start-loading', () => {
      this.toggleSidebar(false);
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

  toggleSidebar(isOpen) {
    const [cw, ch] = this.window.getContentSize();
    if (isOpen && !this.sidebarOpen) {
      this.window.setContentSize(cw + SIDEBAR_WIDTH, ch);
      this.window.setMinimumSize(this.minWidth + SIDEBAR_WIDTH, this.minHeight);
    } else if (!isOpen && this.sidebarOpen) {
      const [w, h] = this.window.getSize();
      this.window.setMinimumSize(this.minWidth, this.minHeight);
      this.window.setSize(w - SIDEBAR_WIDTH, h);
    }
    this.sidebarOpen = isOpen;
  },

  captureScreenshot() {
    const [cw, ch] = this.window.getContentSize();
    this.window.webContents
      .capturePage({
        x: 13,
        y: 62,
        width: cw - 27 - (this.sidebarOpen ? SIDEBAR_WIDTH : 0),
        height: ch - 75,
      })
      .then((image) => {
        return clipboard.writeImage(image);
      })
      .catch((err) => {
        // TODO: handle this
      });
  },
};

export default windowController;
