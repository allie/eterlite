import React from 'react';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Player from './player';

import styles from './styles.css';
import { PluginsProvider, usePlugins } from './context/plugins';

function Layout() {
  const { pluginPanel } = usePlugins();

  return (
    <div className={styles.appContainer}>
      <Toolbar />
      <div className={styles.bottomContainer}>
        <Player />
        {pluginPanel && <Sidebar />}
      </div>
    </div>
  );
}

export default function App() {
  React.useEffect(() => {
    window.electron.ipcRenderer.firstRenderFinished();
  }, []);

  return (
    <PluginsProvider>
      <Layout />
    </PluginsProvider>
  );
}
