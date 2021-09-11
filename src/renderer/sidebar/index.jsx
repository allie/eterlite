import React from 'react';

import { usePlugins } from 'renderer/context/plugins';

import styles from './styles.css';

export default function Sidebar() {
  const { pluginPanel } = usePlugins();

  return (
    <div className={styles.sidebarContainer}>
      {pluginPanel?.name && (
        <div className={styles.title}>{pluginPanel.name}</div>
      )}
      <div className={styles.panelArea}>
        <pluginPanel.Component />
      </div>
    </div>
  );
}
