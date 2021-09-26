import React from 'react';
import styles from './styles.css';

import icon from './icon.png';
import config from './config.json';
import pluginConfigs from '../configs';

import { useGlobalSettings, useSettings } from 'renderer/context/settings';

const SettingsPlugin = {
  config,
  icon: <img src={icon} alt="Settings" />,
  Component() {
    const { settings, setSetting } = useGlobalSettings();

    return (
      <div className={styles.settingsContainer}>
        <div className={styles.pluginContainer}>
          {Object.entries(config.settings).map(([name, setting]) => setting.label ? (
            <div key={name} className={styles.settingContainer}>
              <div className={styles.settingName}>
                {setting.label}
              </div>
              <div className={styles.settingDescription}>
                {setting.description}
              </div>
            </div>
          ) : null)}
        </div>
        {pluginConfigs.map((pluginConfig) => (
          <div key={pluginConfig.name} className={styles.pluginContainer}>
            <div className={styles.pluginHeader}>
              {pluginConfig.name}
            </div>
            {Object.entries(pluginConfig.settings).map(([name, setting]) => (
              <div key={name} className={styles.settingContainer}>
                <div className={styles.settingName}>
                  {setting.label}
                </div>
                <div className={styles.settingDescription}>
                  {setting.description}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export default SettingsPlugin;
