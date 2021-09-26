import { app, BrowserWindow, Menu, session } from 'electron';
import windowController from './window';
import log from './log';
import settingsController from './settings';

const appMenuTemplate = {
  label: 'Eterlite',
  submenu: [
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.quit();
      },
    },
  ],
};

const editMenuTemplate = {
  label: 'Edit',
  submenu: [
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
    { type: 'separator' },
    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
  ],
};

const toolsMenuTemplate = {
  label: 'Tools',
  submenu: [
    {
      label: 'Take Screenshot',
      accelerator: 'CmdOrCtrl+S',
      click() {
        windowController.captureScreenshot();
      },
    },
    {
      label: 'Create Alt Window',
      accelerator: 'CmdOrCtrl+N',
      click() {
        windowController.createExtraWindow();
      },
    },
    {
      label: 'Reload Client',
      accelerator: 'CmdOrCtrl+R',
      click() {
        BrowserWindow.getFocusedWindow().webContents.reload();
      },
    },
    {
      label: 'Open Screenshots Folder',
      click() {
        // TODO: open screenshots folder
      },
    },
  ],
};

const devMenuTemplate = {
  label: 'Development',
  submenu: [
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+CmdOrCtrl+I',
      click() {
        log.debug('menu', '"Toggle DevTools" menu item clicked');
        BrowserWindow.getFocusedWindow().toggleDevTools();
      },
    },
    {
      label: 'Reload Without Cache',
      accelerator: 'CmdOrCtrl+Shift+R',
      click() {
        log.debug('menu', '"Reload Without Cache" menu item clicked');
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      },
    },
    {
      label: 'Clear Settings',
      click() {
        log.debug('menu', '"Clear Settings" menu item clicked');
        settingsController.clear();
        log.debug('menu', 'Relaunching eterlite...');
        // TODO: fix relaunching...
        app.relaunch();
        app.quit();
      },
    },
    {
      label: 'Clear Caches',
      click() {
        log.debug('menu', '"Clear Caches" menu item clicked');
        session.defaultSession.clearStorageData();
        BrowserWindow.getFocusedWindow().webContents.reload();
      },
    },
  ],
};

const menu = {
  init() {
    log.debug('menu', 'Initializing menu...');
    const menus = [
      appMenuTemplate,
      editMenuTemplate,
      toolsMenuTemplate,
      devMenuTemplate,
    ];
    log.silly('menu', 'Menu templates:', menus);
    // TODO: re-enable this code when a way to refresh the client is added
    // if (process.env.NODE_ENV !== 'production') {
    //   menus.push(devMenuTemplate);
    // }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
    log.debug('menu', 'Built menu and set it as application menu');
  },
};

export default menu;
