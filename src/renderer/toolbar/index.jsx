import React from 'react';

import { usePlugins } from 'renderer/context/plugins';
import { useTools } from 'renderer/context/tools';

import homeIcon from 'assets/images/eterspire/sword.png';
import newsIcon from 'assets/images/eterspire/news.png';
import rulesIcon from 'assets/images/eterspire/rules.png';
import bugIcon from 'assets/images/eterspire/bug.png';
import feedbackIcon from 'assets/images/eterspire/feedback.png';
import wikiIcon from 'assets/images/eterspire/wiki.png';
import discordIcon from 'assets/images/eterspire/discord.png';
import twitterIcon from 'assets/images/eterspire/twitter.png';
import redditIcon from 'assets/images/eterspire/reddit.png';
import patreonIcon from 'assets/images/eterspire/patreon.png';

import styles from './styles.css';

export default function Toolbar() {
  const { enabledPlugins, pluginPanel, togglePluginPanel } = usePlugins();
  const { enabledTools } = useTools();

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.leftContainer}>
        <button
          data-tip="Eterspire Home"
          data-place="right"
          data-effect="solid"
          data-offset="{'top': -33, 'left': 47}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.com/index.php'
            )
          }
        >
          <img src={homeIcon} alt="Eterspire Website" />
        </button>
        <button
          data-tip="News &amp; Updates"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.com/index.php'
            )
          }
        >
          <img src={newsIcon} alt="News and Updates" />
        </button>
        <button
          data-tip="Rules"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.com/rules.php'
            )
          }
        >
          <img src={rulesIcon} alt="Rules" />
        </button>
        <button
          data-tip="Report a Bug"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://forms.gle/wtd1jbup18qxLamP9'
            )
          }
        >
          <img src={bugIcon} alt="Report a Bug" />
        </button>
        <button
          data-tip="Submit Feedback"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://forms.gle/wtd1jbup18qxLamP9'
            )
          }
        >
          <img src={feedbackIcon} alt="Submit Feedback" />
        </button>
        <button
          data-tip="Eterspire Wiki"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://eterspire.fandom.com/wiki/Eterspire_Wiki'
            )
          }
        >
          <img src={wikiIcon} alt="Wiki" />
        </button>
        <button
          data-tip="Discord"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://discord.gg/6zVfuAYctU'
            )
          }
        >
          <img src={discordIcon} alt="Discord" />
        </button>
        <button
          data-tip="Twitter"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://twitter.com/martulartu'
            )
          }
        >
          <img src={twitterIcon} alt="Twitter" />
        </button>
        <button
          data-tip="Reddit"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://reddit.com/r/eterspire'
            )
          }
        >
          <img src={redditIcon} alt="Reddit" />
        </button>
        <button
          data-tip="Support Eterspire"
          data-place="bottom"
          data-effect="solid"
          data-offset="{'top': 4}"
          type="button"
          onClick={() =>
            window.electron.ipcRenderer.openExternalLink(
              'https://www.patreon.com/bePatron?u=61266449'
            )
          }
        >
          <img src={patreonIcon} alt="Support Eterspire" />
        </button>
      </div>
      <div className={styles.toolsContainer}>
        {enabledTools.map((tool) => (
          <button
            key={tool.name}
            data-tip={tool.tooltip || tool.name}
            data-place="bottom"
            data-effect="solid"
            data-offset="{'top': 4}"
            type="button"
            onClick={() => tool.onClick()}
          >
            {tool.icon}
          </button>
        ))}
      </div>
      <div className={styles.pluginsContainer}>
        {enabledPlugins.map((plugin, i) => (
          <button
            key={plugin.name}
            data-tip={plugin.tooltip || plugin.name}
            data-place={i === enabledPlugins.length - 1 ? 'left' : 'bottom'}
            data-effect="solid"
            data-offset={
              i === enabledPlugins.length - 1
                ? "{'top': -33, 'right': 47}"
                : "{'top': 4}"
            }
            type="button"
            className={
              pluginPanel?.name === plugin.name ? styles.activePlugin : ''
            }
            onClick={() => togglePluginPanel(plugin.name)}
          >
            {plugin.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
