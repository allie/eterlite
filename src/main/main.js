import { app, ipcMain, shell, session } from 'electron';

import windowController from './window';
import menu from './menu';
import settingsController from './settings';

// Intercept requests and fix the headers so we don't get
// CORS errors when in development. Not necessary in prod.
function fixCors() {
  const filter = {
    urls: ['*://*.eterspire.com/*'],
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders.Origin = 'http://play.eterspire.com';
      callback({ requestHeaders: details.requestHeaders });
    }
  );

  session.defaultSession.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      if (details.responseHeaders) {
        details.responseHeaders['Access-Control-Allow-Origin'] = [
          'http://localhost:1212',
        ];
      }
      callback({ responseHeaders: details.responseHeaders });
    }
  );
}

function initIpcEvents() {
  ipcMain.on('open-external-link', (e, href) => {
    shell.openExternal(href);
  });
}

app.on('ready', () => {
  if (process.env.NODE_ENV !== 'production') {
    fixCors();
  }
  initIpcEvents();
  settingsController.init();
  windowController.init();
  menu.init();
});

app.on('window-all-closed', () => {
  app.quit();
});
