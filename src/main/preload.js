const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  toggleSidebar(show) {
    ipcRenderer.send('sidebar', show);
  },
  toggleFullscreen(fullscreen) {
    ipcRenderer.send('fullscreen', fullscreen);
  },
  takeScreenshot() {
    ipcRenderer.send('screenshot');
  },
  openExternalLink(url) {
    ipcRenderer.send('open-external-link', url);
  },
  firstRenderFinished() {
    ipcRenderer.send('first-render');
  },
  syncSettings() {
    ipcRenderer.send('sync-settings');
  },
  on(channel, func) {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  once(channel, func) {
    ipcRenderer.once(channel, (event, ...args) => func(...args));
  },
  log: {
    error(module, ...args) {
      ipcRenderer.send('log', ['error', module, ...args]);
    },
    warn(module, ...args) {
      ipcRenderer.send('log', ['warn', module, ...args]);
    },
    info(module, ...args) {
      ipcRenderer.send('log', ['info', module, ...args]);
    },
    verbose(module, ...args) {
      ipcRenderer.send('log', ['verbose', module, ...args]);
    },
    debug(module, ...args) {
      ipcRenderer.send('log', ['debug', module, ...args]);
    },
    silly(module, ...args) {
      ipcRenderer.send('log', ['silly', module, ...args]);
    },
  },
});
