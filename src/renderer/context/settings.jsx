import React from 'react';
import PropTypes from 'prop-types';

const globalSettingsContext = React.createContext();
const useGlobalSettings = () => React.useContext(globalSettingsContext);

export function GlobalSettingsProvider({ children }) {
  const [settings, setSettings] = React.useState({});

  // Set up ipc listener for settings syncing from the main thread
  React.useEffect(() => {
    function onSyncSettings(newSettings) {
      setSettings(newSettings);
    }

    window.electron.ipcRenderer.on('sync-settings', onSyncSettings);

    return () => {
      window.electron?.ipcRenderer?.off('sync-settings', onSyncSettings);
    };
  }, [setSettings]);

  // Sync local settings with the main thread
  const syncSettings = React.useCallback(() => {
    window.electron.ipcRenderer.syncSettings();
  }, []);

  // Sync settings on first load
  React.useEffect(() => {
    syncSettings();
  }, [syncSettings]);

  const getSetting = React.useCallback(
    (scope, setting) => {
      if (!settings[scope]) {
        return undefined;
      }
      return settings[scope][setting];
    },
    [settings]
  );

  const setSetting = React.useCallback(
    (scope, setting, value) => {
      if (!settings[scope]) {
        return;
      }

      // Optimistically update the value on the renderer
      setSettings((currentSettings) => {
        if (!currentSettings[scope][value]) {
          return {
            ...currentSettings,
            [scope]: {
              ...currentSettings[scope],
              [setting]: value,
            },
          };
        }
        return currentSettings;
      });

      window.electron.ipcRenderer.setSetting();
    },
    [setSettings, settings]
  );

  const value = React.useMemo(
    () => ({
      settings,
      setSetting,
      getSetting,
    }),
    [settings, setSetting, getSetting]
  );

  return (
    <globalSettingsContext.Provider value={value}>
      {children}
    </globalSettingsContext.Provider>
  );
}

GlobalSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const localSettingsContext = React.createContext();
export const useSettings = () => React.useContext(localSettingsContext);

export function LocalSettingsProvider({ children, scope }) {
  const { settings: globalSettings, setSetting: setGlobalSetting } =
    useGlobalSettings();

  const localSettings = React.useMemo(() => {
    if (!globalSettings) {
      return {};
    }
    return globalSettings[scope];
  }, [globalSettings, scope]);

  const setSetting = React.useCallback(
    (setting, value) => {
      setGlobalSetting(scope, setting, value);
    },
    [setGlobalSetting, scope]
  );

  const value = React.useMemo(
    () => ({
      settings: localSettings,
      setSetting,
    }),
    [localSettings, setSetting]
  );

  return (
    <localSettingsContext.Provider value={value}>
      {children}
    </localSettingsContext.Provider>
  );
}

LocalSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  scope: PropTypes.string.isRequired,
};
