import React from 'react';
import styles from './styles.css';

import icon from './icon.png';
import config from './config.json';

const SettingsPlugin = {
  config,
  icon: <img src={icon} alt="Settings" />,
  Component() {
    return <div className={styles.settingsContainer}>Coming soon</div>;
  },
};

export default SettingsPlugin;
