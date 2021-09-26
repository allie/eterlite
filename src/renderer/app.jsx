import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Player from './player';

import styles from './styles.css';
import { PluginsProvider, usePlugins } from './context/plugins';
import { ToolsProvider } from './context/tools';
import { GlobalSettingsProvider } from './context/settings';

function MainWindow() {
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

function AltWindow() {
  return (
    <div className={styles.appContainer}>
      <Player minimal />
    </div>
  );
}

function AppRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/alt">
          <AltWindow />
        </Route>
        <Route path="/" exact>
          <MainWindow />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default function App() {
  React.useEffect(() => {
    electron.firstRenderFinished();
  }, []);

  return (
    <>
      <GlobalSettingsProvider>
        <PluginsProvider>
          <ToolsProvider>
            <AppRouter />
          </ToolsProvider>
        </PluginsProvider>
        <ReactTooltip delayShow={700} />
      </GlobalSettingsProvider>
    </>
  );
}
