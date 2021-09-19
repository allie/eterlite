import React from 'react';

import { usePlugins } from 'renderer/context/plugins';
import { LocalSettingsProvider } from 'renderer/context/settings';

import styles from './styles.css';

export default function Sidebar() {
  const { pluginPanel } = usePlugins();

  if (!pluginPanel) {
    return null;
  }

  return (
    <div className={styles.sidebarContainer}>
      {pluginPanel?.config.name && (
        <div className={styles.title}>{pluginPanel.config.name}</div>
      )}
      <div className={styles.panelArea}>
        <LocalSettingsProvider scope={pluginPanel.config.scope}>
          <pluginPanel.Component />
        </LocalSettingsProvider>
      </div>
    </div>
  );
}
