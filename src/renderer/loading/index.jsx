import React from 'react';
import PropTypes from 'prop-types';
import useEaseValue from 'renderer/utils/ease-value';
import get0 from 'assets/sfx/eterspire/get0.wav';
import get1 from 'assets/sfx/eterspire/get1.wav';
import get2 from 'assets/sfx/eterspire/get2.wav';
import get3 from 'assets/sfx/eterspire/get3.wav';
import get4 from 'assets/sfx/eterspire/get4.wav';
import get5 from 'assets/sfx/eterspire/get5.wav';
import get6 from 'assets/sfx/eterspire/get6.wav';
import get7 from 'assets/sfx/eterspire/get7.wav';
import get8 from 'assets/sfx/eterspire/get8.wav';
import get9 from 'assets/sfx/eterspire/get9.wav';
import get10 from 'assets/sfx/eterspire/get10.wav';
import get11 from 'assets/sfx/eterspire/get11.wav';
import get12 from 'assets/sfx/eterspire/get12.wav';
import styles from './styles.css';

const sfx = [
  new Audio(get0),
  new Audio(get1),
  new Audio(get2),
  new Audio(get3),
  new Audio(get4),
  new Audio(get5),
  new Audio(get6),
  new Audio(get7),
  new Audio(get8),
  new Audio(get9),
  new Audio(get10),
  new Audio(get11),
  new Audio(get12),
];

sfx.forEach((sound) => {
  sound.volume = 0.8;
});

const delays = Array(12)
  .fill(true)
  .map((item) => Math.floor(Math.random() * 1000));

export default function LoadingScreen({ loading, progress }) {
  const [show, setShow] = React.useState(true);
  const [finished, setFinished] = React.useState(false);
  const easedProgress = useEaseValue(progress, 200);
  const [lastEasedProgress, setLastEasedProgress] = React.useState(0);

  React.useEffect(() => {
    if (easedProgress !== undefined) {
      if (easedProgress === 1) {
        return setTimeout(() => {
          setShow(false);
          setTimeout(() => {
            setFinished(true);
          }, 1100);
        }, 1000);
      }
      return setShow(true);
    }

    if (loading !== undefined) {
      return setShow(loading);
    }

    setShow(false);

    return () => {};
  }, [easedProgress, loading, setFinished]);

  React.useEffect(() => {
    if (Math.floor(12 * easedProgress) > Math.floor(12 * lastEasedProgress)) {
      sfx[Math.floor(12 * easedProgress)].play();
      setLastEasedProgress(easedProgress);
    }
  }, [easedProgress, setLastEasedProgress, lastEasedProgress]);

  const rays = React.useMemo(() => {
    if (easedProgress !== undefined) {
      return Array(Math.floor(12 * easedProgress))
        .fill(true)
        .map((ray, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`ray${i}`}
            className={`${styles.ray} ${styles[`ray${i}`]}`}
            style={{
              animationDelay: `-${delays[i]}ms`,
            }}
          />
        ));
    }
    return <div className={styles.spin} />;
  }, [easedProgress]);

  return !finished ? (
    <div className={`${styles.loadingContainer} ${!show && styles.finished}`}>
      <div className={styles.innerContainer}>
        {rays}
        <div className={styles.centre} />
      </div>
    </div>
  ) : null;
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool,
  progress: PropTypes.number,
};

LoadingScreen.defaultProps = {
  loading: undefined,
  progress: undefined,
};
