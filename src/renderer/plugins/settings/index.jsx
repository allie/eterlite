import React from 'react';
import styles from './styles.css';

import icon from './icon.png';

const SettingsPlugin = {
  name: 'Settings',
  id: 'eterlite',
  version: '0.1.0',
  author: 'allie',
  icon: <img src={icon} alt="Settings" />,
  settings: {},
  Component() {
    return <div className={styles.settingsContainer}>Coming soon</div>;
  },
};

export default SettingsPlugin;
