import React from 'react';
import PropTypes from 'prop-types';

import LoadingScreen from '../loading';

import styles from './styles.css';

const isDev = process.env.NODE_ENV !== 'production';

export default function Player({ minimal, clientOnly }) {
  const gameInstanceRef = React.useRef();
  const [progress, setProgress] = React.useState(0);
  console.log(clientOnly);

  React.useEffect(() => {
    // If in dev, don't load the client. Speeds up development
    if (isDev) {
      // return;
    }

    window.devicePixelRatio = 1;

    // TODO: replace this with a local config file
    window.setCookie = (name, value, days) => {
      console.log('set cookie', name, value);
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
      }
      document.cookie = `${name}=${value || ''}${expires}; path=/`;
    };

    // TODO: replace this with a local config file
    window.getCookie = (name) => {
      console.log('get cookie', name);
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return 0;
    };

    // Toggle between fullscreen and windowed
    window.resizeScreen = (fullscreen) => {
      electron.toggleFullscreen(fullscreen);
    };

    window.OpenFeedbackForm = () => {
      electron.openExternalLink('https://forms.gle/wtd1jbup18qxLamP9');
    };

    function resizeCanvas() {
      // TODO: rework this hack
      if (window.sidebarWasToggled) {
        window.sidebarWasToggled = false;
        return;
      }

      const height = window.innerHeight < 600 ? 600 : window.innerHeight;
      const width = document.getElementById('gameClient').clientWidth;

      // TODO: this is a pretty lame solution, let's come up with something better
      // when we make alt windows use the toolbar and sidebar
      if (minimal) {
        document
          .querySelector('canvas')
          ?.setAttribute(
            'style',
            `width: ${width - 1}px; height: ${height - 31}px;`
          );
      } else {
        document
          .querySelector('canvas')
          ?.setAttribute(
            'style',
            `width: ${width - 1}px; height: ${height - 81}px;`
          );
      }
    }

    gameInstanceRef.current = UnityLoader.instantiate(
      'gameClient',
      'http://play.eterspire.com/Build/Eterspire.json',
      {
        onProgress(gameInstance, newProgress) {
          setProgress(newProgress);
          if (newProgress === 1) {
            document.getElementById('#canvas').style.display = 'block';
          }
        },
      }
    );

    const canvas = document.getElementById('#canvas');
    canvas.style.display = 'none';
    canvas.onselectstart = () => false;

    document.getElementById('gameClient').focus();
  }, [setProgress, minimal]);

  return (
    <>
      {!isDev && <LoadingScreen progress={progress} />}
      {/* TODO: find a better fix for this, this hack sucks.
      the problem is: often, a button is focused by default
      when launching the app, and it causes a tooltip to show.
      focusing this div fixes it, but it's kind of a goofy workaround
      and requires me to break a bunch of rules */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/tabindex-no-positive */}
      <div tabIndex="1" className={`${styles.gameClient} ${clientOnly ? styles.clientOnly : ''}`} id="gameClient" />
    </>
  );
}

Player.propTypes = {
  minimal: PropTypes.bool,
  clientOnly: PropTypes.bool
};

Player.defaultProps = {
  minimal: false,
  clientOnly: false
};
