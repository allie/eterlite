import React from 'react';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Player from './player';
import { SidebarProvider, useSidebar } from './sidebar/context';

import styles from './styles.css';

function Layout() {
  const { sidebarIsOpen } = useSidebar();

  return (
    <div className={styles.appContainer}>
      <Toolbar />
      <div className={styles.bottomContainer}>
        <Player />
        {sidebarIsOpen && <Sidebar />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SidebarProvider>
      <Layout />
    </SidebarProvider>
  );
}
