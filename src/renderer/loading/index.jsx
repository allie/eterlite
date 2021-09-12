import React from 'react';
import PropTypes from 'prop-types';
import useEaseValue from 'renderer/utils/ease-value';
import styles from './styles.css';

export default function LoadingScreen({ loading, progress }) {
  const [show, setShow] = React.useState(true);
  const easedProgress = useEaseValue(progress, 200);

  React.useEffect(() => {
    if (easedProgress !== undefined) {
      if (easedProgress === 1) {
        return setTimeout(() => setShow(false), 1000);
      }
      return setShow(true);
    }

    if (loading !== undefined) {
      return setShow(loading);
    }

    setShow(false);

    return () => {};
  }, [easedProgress, loading]);

  const rays = React.useMemo(() => {
    if (easedProgress !== undefined) {
      return Array(Math.floor(12 * easedProgress))
        .fill(true)
        .map((ray, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`ray${i}`}
            className={`${styles.ray} ${styles[`ray${i}`]}`}
          />
        ));
    }
    return <div className={styles.spin} />;
  }, [easedProgress]);

  return (
    <div className={`${styles.loadingContainer} ${!show && styles.finished}`}>
      {rays}
      <div className={styles.centre} />
    </div>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool,
  progress: PropTypes.number,
};

LoadingScreen.defaultProps = {
  loading: undefined,
  progress: undefined,
};
