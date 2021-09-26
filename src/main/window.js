import { BrowserWindow, clipboard, ipcMain } from 'electron';
import debounce from 'debounce';
import isDev from 'electron-is-dev';
import path from 'path';
import log from './log';
import settingsController from './settings';

const SIDEBAR_WIDTH = 320;

const windowController = {
  window: null,
  extraWindows: [],
  sidebarOpen: false,
  minWidth: 0, // minimum width including window decoration
  minHeight: 0, // minimum height including window decoration
  ready: false,

  init() {
    // Restore window bounds from settings if remembering is enabled
    const rememberWindow = settingsController.getSetting(
      'eterlite',
      'rememberWindow'
    );
    const bounds = rememberWindow
      ? settingsController.getSetting('eterlite', 'windowBounds')
      : {
          width: 933,
          height: 681,
        };

    if (rememberWindow) {
      log.debug(
        'window',
        'Loaded saved window bounds:',
        `x=${bounds.x}, y=${bounds.y}, width=${bounds.width}, height=${bounds.height}`
      );
    }

    this.window = new BrowserWindow({
      autoHideMenuBar: true,
      show: false,
      useContentSize: true,
      ...bounds,
      minWidth: 933,
      minHeight: 681,
      backgroundColor: '#000000',
      title: 'Eterlite',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        backgroundThrottling: false,
        contextIsolation: true,
      },
    });

    log.debug('window', 'Created main window');

    if (isDev) {
      this.window.webContents.openDevTools();
    }

    const [width, height] = this.window.getSize();
    this.minWidth = width;
    this.minHeight = height;

    ipcMain.on('sidebar', (event, isOpen) => {
      log.debug('window', 'Received ipc message "sidebar"', isOpen);
      this.toggleSidebar(isOpen);
    });

    ipcMain.on('fullscreen', (event, fullscreen) => {
      log.debug('window', 'Received ipc message "fullscreen"', fullscreen);
      const fswindow = BrowserWindow.getFocusedWindow() || this.window;
      fswindow.setFullScreen(fullscreen);
    });

    ipcMain.on('screenshot', () => {
      log.debug('window', 'Received ipc message "screenshot"');
      this.captureScreenshot();
    });

    ipcMain.on('extra-window', () => {
      log.debug('window', 'Received ipc message "extra-window"');
      this.createExtraWindow();
    });

    ipcMain.on('reload', () => {
      log.debug('window', 'Received ipc message "reload"');
      log.debug('window', 'Reloading client...');
      const target = BrowserWindow.getFocusedWindow() || this.window;
      target.webContents.reloadIgnoringCache();
    });

    ipcMain.on('first-render', () => {
      log.debug('window', 'Received ipc message "first-render"');
      // If the main window has already been initialized before, this is an extra window
      // Show the most recent extra window in this case
      if (
        this.ready &&
        this.extraWindows.length > 0 &&
        this.extraWindows[this.extraWindows.length - 1]
      ) {
        log.debug('window', 'Showing most recently created extra window');
        this.extraWindows[this.extraWindows.length - 1].show();
      } else {
        this.ready = true;
        this.window.show();
      }
    });

    // Save window bounds to settings, debounced
    // TODO: ipc message listener to toggle this callback
    if (rememberWindow) {
      log.debug('window', 'Setting up "resize" event listener...');
      this.window.on(
        'resize',
        debounce(() => {
          const [newWidth, newHeight] = this.window.getContentSize();
          const [newX, newY] = this.window.getPosition();
          settingsController.writeSetting('eterlite', 'windowBounds', {
            x: newX,
            y: newY,
            width: this.sidebarOpen ? newWidth - SIDEBAR_WIDTH : newWidth,
            height: newHeight,
          });
        }, 500)
      );
    }

    // Close the sidebar on reload
    // TODO: Remove this and load sidebar state from config file instead
    this.window.webContents.on('did-start-loading', () => {
      log.debug('window', 'webContents event "did-start-loading"');
      this.toggleSidebar(false);
    });

    log.debug('window', 'Loading React app...');
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
      const contentWidth = cw + SIDEBAR_WIDTH;
      const minWidth = this.minWidth + SIDEBAR_WIDTH;

      this.window.setContentSize(contentWidth, ch);
      this.window.setMinimumSize(minWidth, this.minHeight);

      const [ww, wh] = this.window.getSize();

      log.debug('window', 'Opened sidebar');
      log.silly('window', 'New window size:', `${ww}, ${wh}`);
      log.silly('window', 'New content size:', `${contentWidth}, ${ch}`);
      log.silly(
        'window',
        'New minimum size:',
        `${minWidth}, ${this.minHeight}`
      );
    } else if (!isOpen && this.sidebarOpen) {
      const [w, h] = this.window.getSize();

      this.window.setMinimumSize(this.minWidth, this.minHeight);
      this.window.setSize(w - SIDEBAR_WIDTH, h);

      const [contentWidth] = this.window.getContentSize();
      const [ww, wh] = this.window.getSize();

      log.debug('window', 'Closed sidebar');
      log.silly('window', 'New window size:', `${ww}, ${wh}`);
      log.silly('window', 'New content size:', `${contentWidth}, ${ch}`);
      log.silly(
        'window',
        'New minimum size:',
        `${this.minWidth}, ${this.minHeight}`
      );
    }
    this.sidebarOpen = isOpen;
  },

  captureScreenshot() {
    const [cw, ch] = this.window.getContentSize();
    const x = 16;
    const y = 65;
    const width = cw - 33 - (this.sidebarOpen ? SIDEBAR_WIDTH : 0);
    const height = ch - 81;

    log.debug('window', 'Taking screenshot...');
    log.silly(
      'window',
      'Bounds:',
      `x=${x}, y=${y}, width=${width}, height=${height}`
    );

    this.window.webContents
      .capturePage({
        x,
        y,
        width,
        height,
      })
      .then((image) => {
        log.debug('window', 'Captured screenshot to image');
        log.debug('window', 'Writing screenshot to clipboard...');
        // TODO: log the clipboard success state
        return clipboard.writeImage(image);
      })
      .catch((err) => {
        log.error('window', err.message);
      });
  },

  createExtraWindow() {
    log.debug('window', 'Creating new extra window...');
    const [cw, ch] = this.window.getContentSize();

    const newWindow = new BrowserWindow({
      autoHideMenuBar: true,
      show: true,
      useContentSize: true,
      width: cw,
      height: ch - 50,
      minWidth: 933,
      minHeight: 631,
      backgroundColor: '#000000',
      title: 'Eterlite',
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        backgroundThrottling: false,
        contextIsolation: true,
      },
    });

    newWindow.on('close', () => {
      log.debug('window', 'Closing extra window...');
      newWindow.destroy();
      this.extraWindows = this.extraWindows.filter((win) => win !== newWindow);
      log.silly('window', 'Extra windows:', this.extraWindows);
    });

    log.debug('window', 'Loading React app in extra window...');
    if (process.env.NODE_ENV === 'development') {
      const port = process.env.PORT || 1212;
      const url = new URL(`http://localhost:${port}`);
      url.pathname = 'index.html';
      newWindow.webContents.loadURL(`${url.href}#/alt`);
    } else {
      newWindow.webContents.loadURL(
        `file://${path.resolve(__dirname, '../renderer/', 'index.html')}#/alt`
      );
    }

    this.extraWindows = [
      ...this.extraWindows.filter((win) => win !== null),
      newWindow,
    ];
  },
};

export default windowController;
