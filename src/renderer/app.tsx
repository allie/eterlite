import React from 'react';
import './styles.css';

import Toolbar from './toolbar';
import Sidebar from './sidebar';
import Player from './player';

export default function App() {
  return (
    <div className="container">
      <Toolbar />
      <div className="bottom-container">
        <Player />
        <Sidebar />
      </div>
    </div>
  );
}
