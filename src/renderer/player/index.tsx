import React from 'react';
import './styles.css';

export default function Player() {
  React.useEffect(() => {
    window.devicePixelRatio = 1;

    window.UnityLoader.instantiate(
      'game-client',
      'http://play.eterspire.com/Build/Eterspire.json',
      (gameInstance, progress) => {
        // if (!gameInstance.Module) {
        //   return;
        // }
        // TODO: do something with the loading progress value
      }
    );

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
      return 1;
    };

    // Toggle between fullscreen and windowed
    window.resizeScreen = (fullScreen) => {
      // TODO
    };

    window.OpenFeedbackForm = () => {
      // ipcRenderer.send('open-external-link', 'https://forms.gle/wtd1jbup18qxLamP9');
    };

    function resizeCanvas() {
      const height = window.innerHeight < 600 ? 600 : window.innerHeight;
      document
        .querySelector('canvas')
        ?.setAttribute('style', `height: ${height}px;`);
    }

    window.addEventListener('resize', resizeCanvas);

    const canvas = document.getElementById('#canvas');
    canvas.onselectstart = () => false;

    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <div id="game-client" />;
}
