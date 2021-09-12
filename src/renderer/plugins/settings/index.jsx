import React from 'react';
import styles from './styles.css';

import icon from './icon.png';

const placeStyles = [styles.first, styles.second, styles.third];

const SettingsPlugin = {
  name: 'Settings',
  version: '0.1.0',
  author: 'allie',
  icon: <img src={icon} alt="Settings" />,
  Component() {
    return <div className={styles.settingsContainer}>Coming soon</div>;
  },
};

export default SettingsPlugin;
