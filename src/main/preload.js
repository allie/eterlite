const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
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
  },
});
