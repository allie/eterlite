import React from 'react';
import styles from './styles.css';

import icon from './icon.png';
import config from './config.json';

import { useGlobalSettings, useSettings } from 'renderer/context/settings';
import { usePlugins } from 'renderer/context/plugins';

function Setting({ setting, value, setValue }) {
  if (setting.type === 'toggle') {
    return (
      <div className={styles.settingToggleContainer}>
        <div className={styles.settingToggleleftContainer}>
          <div className={styles.settingName}>
            {setting.label}
          </div>
          <div className={styles.settingDescription}>
            {setting.description}
          </div>
        </div>
        <div className={styles.settingToggleRightContainer}>
          <input type="checkbox" checked={value} onChange={e => setValue(e.target.checked)} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.settingContainer}>
      <div className={styles.settingName}>
        {setting.label}
      </div>
      <div className={styles.settingDescription}>
        {setting.description}
      </div>
    </div>
  );
}

const SettingsPlugin = {
  config,
  icon: <img src={icon} alt="Settings" />,
  Component() {
    const { settings, setSetting } = useGlobalSettings();
    const { plugins } = usePlugins();
    console.log(settings);

    return (
      <div className={styles.settingsContainer}>
        <div className={styles.pluginContainer}>
          {Object.entries(config.settings).map(([name, setting]) => setting.label ? (
            <Setting key={name} setting={setting} value={settings.eterlite[name]} setValue={(val) => setSetting('eterlite', name, val)} />
          ) : null)}
        </div>
        {plugins && Object.entries(plugins).map(([pluginName, plugin]) => plugin.enabled && pluginName !== 'Settings' ? (
          <div key={pluginName} className={styles.pluginContainer}>
            <div className={styles.pluginHeader}>
              Plugin: {pluginName}
            </div>
            {Object.entries(plugin.module.config.settings).map(([settingName, setting]) => (
              <Setting key={settingName} setting={setting} value={settings[plugin.module.config.scope][settingName]} setValue={(val) => setSetting(plugin.module.config.scope, settingName, val)} />
            ))}
          </div>
        ) : null)}
      </div>
    );
  },
};

export default SettingsPlugin;
