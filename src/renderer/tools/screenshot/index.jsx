import React from 'react';

import icon from './icon.png';

const ScreenshotTool = {
  name: 'Screenshot',
  tooltip: 'Take Screenshot',
  version: '0.1.0',
  author: 'allie',
  icon: <img src={icon} alt="Screenshot" />,
  onClick() {
    window.electron.ipcRenderer.takeScreenshot();
  },
};

export default ScreenshotTool;
