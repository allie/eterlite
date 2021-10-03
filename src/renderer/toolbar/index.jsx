import React from 'react';
import PropTypes from 'prop-types';

import { usePlugins } from 'renderer/context/plugins';
import { useTools } from 'renderer/context/tools';

import eterliteIcon from 'assets/images/eterlite.png';
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

const links = [
  {
    href: 'https://eterspire.com/index.php',
    tooltip: 'Eterspire Home',
    img: homeIcon,
  },
  {
    href: 'https://eterspire.com/index.php',
    tooltip: 'News & Updates',
    img: newsIcon,
  },
  {
    href: 'https://eterspire.com/rules.php',
    tooltip: 'Rules',
    img: rulesIcon,
  },
  {
    href: 'https://forms.gle/wtd1jbup18qxLamP9',
    tooltip: 'Report a Bug',
    img: bugIcon,
  },
  {
    href: 'https://forms.gle/wtd1jbup18qxLamP9',
    tooltip: 'Submit Feedback',
    img: feedbackIcon,
  },
  {
    href: 'https://eterspire.fandom.com/wiki/Eterspire_Wiki',
    tooltip: 'Eterspire Wiki',
    img: wikiIcon,
  },
  {
    href: 'https://discord.gg/6zVfuAYctU',
    tooltip: 'Discord',
    img: discordIcon,
  },
  {
    href: 'https://twitter.com/martulartu',
    tooltip: 'Twitter',
    img: twitterIcon,
  },
  {
    href: 'https://reddit.com/r/eterspire',
    tooltip: 'Reddit',
    img: redditIcon,
  },
  {
    href: 'https://www.patreon.com/bePatron?u=61266449',
    tooltip: 'Support Eterspire',
    img: patreonIcon,
  },
];

function LinkButton({ href, img, tooltip, ...rest }) {
  return (
    <button
      data-place="right"
      data-effect="solid"
      data-offset="{'left': 6}"
      type="button"
      {...rest}
      data-tip={tooltip}
      onClick={() => electron.openExternalLink(href)}
    >
      <img src={img} alt={tooltip} />
    </button>
  );
}

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default function Toolbar() {
  const { enabledPlugins, pluginPanel, togglePluginPanel } = usePlugins();
  const { enabledTools } = useTools();

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.leftContainer}>
        {/* <button
          type="button"
        >
          <img src={eterliteIcon} alt="Eterlite" />
        </button> */}
        {links.map((buttonProps) => (
          <LinkButton key={buttonProps.tooltip} {...buttonProps} />
        ))}
      </div>
      <div className={styles.toolsContainer}>
        {enabledTools.map((tool) => (
          <button
            key={tool.name}
            data-tip={tool.tooltip || tool.name}
            data-place="left"
            data-effect="solid"
            data-offset="{'right': 6}"
            type="button"
            onClick={() => tool.onClick()}
          >
            {tool.icon}
          </button>
        ))}
      </div>
      <div className={styles.pluginsContainer}>
        {enabledPlugins.map((plugin) => (
          <button
            key={plugin.config.name}
            data-tip={plugin.config.tooltip || plugin.config.name}
            data-place="left"
            data-effect="solid"
            data-offset="{'right': 6}"
            type="button"
            className={
              pluginPanel?.config.name === plugin.config.name
                ? styles.activePlugin
                : ''
            }
            onClick={() => togglePluginPanel(plugin.config.name)}
          >
            {plugin.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
