import React from 'react';

import { usePlugins } from 'renderer/context/plugins';
import { useTools } from 'renderer/context/tools';

import styles from './styles.css';

export default function Toolbar() {
  const { enabledPlugins, pluginPanel, togglePluginPanel } = usePlugins();
  const { enabledTools } = useTools();

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.leftContainer}>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.com/index.php'
            )
          }
        >
          <img src="assets/images/sword.png" alt="Eterspire Website" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.com/index.php'
            )
          }
        >
          <img src="assets/images/news.png" alt="News and Updates" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.com/rules.php'
            )
          }
        >
          <img src="assets/images/rules.png" alt="Rules" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://forms.gle/wtd1jbup18qxLamP9'
            )
          }
        >
          <img src="assets/images/bug.png" alt="Report a Bug" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://forms.gle/wtd1jbup18qxLamP9'
            )
          }
        >
          <img src="assets/images/feedback.png" alt="Submit Feedback" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.fandom.com/wiki/Eterspire_Wiki'
            )
          }
        >
          <img src="assets/images/wiki.png" alt="Wiki" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://discord.gg/6zVfuAYctU'
            )
          }
        >
          <img src="assets/images/discord.png" alt="Discord" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://twitter.com/martulartu'
            )
          }
        >
          <img src="assets/images/twitter.png" alt="Twitter" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://reddit.com/r/eterspire'
            )
          }
        >
          <img src="assets/images/reddit.png" alt="Reddit" />
        </button>
        <button
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://www.patreon.com/bePatron?u=61266449'
            )
          }
        >
          <img src="assets/images/patreon.png" alt="Support Eterspire" />
        </button>
      </div>
      <div className={styles.toolsContainer}>
        {enabledTools.map((tool) => (
          <button key={tool.name} type="button" onClick={() => tool.onClick()}>
            {tool.icon}
          </button>
        ))}
      </div>
      <div className={styles.pluginsContainer}>
        {enabledPlugins.map((plugin) => (
          <button
            key={plugin.name}
            type="button"
            className={pluginPanel?.name === plugin.name && styles.activePlugin}
            onClick={() => togglePluginPanel(plugin.name)}
          >
            {plugin.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
