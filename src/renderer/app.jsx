import React from 'react';
import ReactTooltip from 'react-tooltip';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Player from './player';

import styles from './styles.css';
import { PluginsProvider, usePlugins } from './context/plugins';
import { ToolsProvider } from './context/tools';
import { GlobalSettingsProvider } from './context/settings';

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
    electron.firstRenderFinished();
    electron.log.debug('App', 'hello from renderer!');
  }, []);

  return (
    <>
      <GlobalSettingsProvider>
        <PluginsProvider>
          <ToolsProvider>
            <Layout />
          </ToolsProvider>
        </PluginsProvider>
        <ReactTooltip delayShow={700} />
      </GlobalSettingsProvider>
    </>
  );
}
