import { app, BrowserWindow, Menu } from 'electron';
import windowController from './window';

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
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click() {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      },
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+CmdOrCtrl+I',
      click() {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      },
    },
  ],
};

const menu = {
  init() {
    const menus = [
      appMenuTemplate,
      editMenuTemplate,
      toolsMenuTemplate,
      devMenuTemplate,
    ];
    // TODO: re-enable this code when a way to refresh the client is added
    // if (process.env.NODE_ENV !== 'production') {
    //   menus.push(devMenuTemplate);
    // }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
  },
};

export default menu;
