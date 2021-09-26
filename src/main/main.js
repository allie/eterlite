import { app, ipcMain, shell, session } from 'electron';

import windowController from './window';
import menu from './menu';
import settingsController from './settings';
import log, { renderThreadLog } from './log';

// Ensure only one instance of Eterlite runs at once
const gotLock = app.requestSingleInstanceLock();

if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    windowController.window.focus();
  });
}

// Intercept requests and fix the headers so we don't get
// CORS errors when in development. Not necessary in prod.
function fixCors() {
  log.debug('main', 'Fixing CORS...');

  const filter = {
    urls: ['*://*.eterspire.com/*'],
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders.Origin = 'http://play.eterspire.com';
      log.silly('main', 'Replacing Origin header before send...', details.url);
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
      log.silly(
        'main',
        'Injecting Access-Control-Allow-Origin header...',
        details.url
      );
      callback({ responseHeaders: details.responseHeaders });
    }
  );
}

function initIpcEvents() {
  ipcMain.on('open-external-link', (e, href) => {
    log.debug('main', 'Received ipc message "open-external-link"', href);
    shell.openExternal(href);
  });

  ipcMain.on('log', (event, [level, module, ...args]) => {
    if (renderThreadLog[level]) {
      renderThreadLog[level](module, ...args);
    } else {
      renderThreadLog.warn(
        module,
        `Logged from render thread with invalid level "${level}":`,
        ...args
      );
    }
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
  log.debug('main', 'All windows closed, quitting...');
  app.quit();
});
