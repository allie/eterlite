import React from 'react';
import PropTypes from 'prop-types';

import SettingsPlugin from 'renderer/plugins/settings';
import HighscoresPlugin from 'renderer/plugins/highscores';

const ALL_PLUGINS = [
  {
    module: SettingsPlugin,
    defaultEnabled: true,
    canToggle: false,
  },
  {
    module: HighscoresPlugin,
    defaultEnabled: true,
    canToggle: true,
  },
];

const pluginsContext = React.createContext();

export const usePlugins = () => React.useContext(pluginsContext);

export function PluginsProvider({ children }) {
  // Full set of plugins, each with a toggle to enable or disable
  // A default set of plugins is enabled, and then overridden by
  // the user's saved preferences
  const [plugins, setPlugins] = React.useState({
    ...ALL_PLUGINS.reduce(
      (acc, plugin) => ({
        ...acc,
        [plugin.module.name]: {
          module: plugin.module,
          enabled: plugin.defaultEnabled,
          canToggle: plugin.canToggle,
        },
      }),
      {}
    ),
    // TODO: spread enabled plugins from a config file
  });

  const enabledPlugins = React.useMemo(
    () =>
      Object.entries(plugins).reduce(
        (acc, [, plugin]) => [
          ...acc,
          ...(plugin.enabled ? [plugin.module] : []),
        ],
        []
      ),
    [plugins]
  );

  // Enable or disable a plugin by name
  const togglePlugin = React.useCallback(
    (name, enabled) => {
      setPlugins((oldPlugins) => {
        if (!oldPlugins[name]) {
          return oldPlugins;
        }

        if (!oldPlugins[name].canToggle) {
          return oldPlugins;
        }

        return {
          ...oldPlugins,
          [name]: {
            ...oldPlugins[name],
            enabled,
          },
        };
      });
    },
    [setPlugins]
  );

  // Plugin panels are displayed in a sidebar on the right. Only one may be
  // active at a time
  const [currentPluginPanel, setCurrentPluginPanel] = React.useState(null);
  const togglePluginPanel = React.useCallback(
    (name) => {
      setCurrentPluginPanel((oldCurrentPluginPanel) => {
        if (!oldCurrentPluginPanel) {
          window.sidebarWasToggled = true;
          window.electron.ipcRenderer.toggleSidebar(true);
          return name;
        }

        if (oldCurrentPluginPanel === name) {
          window.sidebarWasToggled = true;
          window.electron.ipcRenderer.toggleSidebar(false);
          return null;
        }

        return name;
      });
    },
    [setCurrentPluginPanel]
  );

  const pluginPanel = React.useMemo(
    () => enabledPlugins.find((plugin) => plugin.name === currentPluginPanel),
    [currentPluginPanel, enabledPlugins]
  );

  const value = React.useMemo(
    () => ({
      plugins,
      enabledPlugins,
      togglePlugin,
      pluginPanel,
      togglePluginPanel,
    }),
    [plugins, enabledPlugins, togglePlugin, pluginPanel, togglePluginPanel]
  );

  return (
    <pluginsContext.Provider value={value}>{children}</pluginsContext.Provider>
  );
}

PluginsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
