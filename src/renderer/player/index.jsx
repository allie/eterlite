import React from 'react';
import styles from './styles.css';

export default function Player() {
  const gameInstanceRef = React.useRef();

  React.useEffect(() => {
    window.devicePixelRatio = 1;

    // TODO: replace this with a local config file
    window.setCookie = (name, value, days) => {
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
      window.electron.ipcRenderer.toggleFullscreen(fullscreen);
    };

    window.OpenFeedbackForm = () => {
      window.electron.ipcRenderer.openExternalLink(
        'https://forms.gle/wtd1jbup18qxLamP9'
      );
    };

    function resizeCanvas() {
      // TODO: rework this hack
      if (window.sidebarWasToggled) {
        window.sidebarWasToggled = false;
        return;
      }

      const height = window.innerHeight < 600 ? 600 : window.innerHeight;
      const width = document.getElementById('gameClient').clientWidth;
      document
        .querySelector('canvas')
        ?.setAttribute('style', `width: ${width}px; height: ${height - 32}px;`);
    }

    gameInstanceRef.current = window.UnityLoader.instantiate(
      'gameClient',
      'http://play.eterspire.com/Build/Eterspire.json',
      {
        onProgress(gameInstance, progress) {
          // if (!gameInstance.Module) {
          //   return;
          // }
          // TODO: do something with the loading progress value
        },
      }
    );

    window.addEventListener('resize', resizeCanvas);

    const canvas = document.getElementById('#canvas');
    canvas.onselectstart = () => false;

    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <div className={styles.gameClient} id="gameClient" />;
}
