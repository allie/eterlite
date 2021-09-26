import React from 'react';

import icon from './icon.png';

const ExtraWindowTool = {
  name: 'Create Alt Window',
  tooltip: 'Create Alt Window',
  version: '0.1.0',
  author: 'allie',
  icon: <img src={icon} alt="Create Alt Window" />,
  onClick() {
    electron.createExtraWindow();
  },
};

export default ExtraWindowTool;
