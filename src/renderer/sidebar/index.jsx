import React from 'react';

import Highscores from './highscores';

import styles from './styles.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      <Highscores />
    </div>
  );
}
