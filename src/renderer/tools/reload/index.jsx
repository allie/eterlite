import React from 'react';

import icon from './icon.png';

const ReloadTool = {
  name: 'Reload',
  tooltip: 'Reload Client',
  version: '0.1.0',
  author: 'allie',
  icon: <img src={icon} alt="Reload Client" />,
  onClick() {
    electron.reload();
  },
};

export default ReloadTool;
