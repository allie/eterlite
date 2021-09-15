import React from 'react';
import ReactTooltip from 'react-tooltip';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Player from './player';

import styles from './styles.css';
import { PluginsProvider, usePlugins } from './context/plugins';
import { ToolsProvider } from './context/tools';

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
    <>
      <PluginsProvider>
        <ToolsProvider>
          <Layout />
        </ToolsProvider>
      </PluginsProvider>
      <ReactTooltip delayShow={1000} />
    </>
  );
}
