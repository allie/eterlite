const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    toggleSidebar(show) {
      ipcRenderer.send('sidebar', show);
    },
    toggleFullscreen(fullscreen) {
      ipcRenderer.send('fullscreen', fullscreen);
    },
    openExternalLink(url) {
      ipcRenderer.send('open-external-link', url);
    },
    firstRenderFinished() {
      ipcRenderer.send('first-render');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
