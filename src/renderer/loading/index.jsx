import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const rayStyles = [
  styles.ray0,
  styles.ray1,
  styles.ray2,
  styles.ray3,
  styles.ray4,
  styles.ray5,
  styles.ray6,
  styles.ray7,
  styles.ray8,
  styles.ray9,
  styles.ray10,
  styles.ray11,
];

export default function LoadingScreen({ loading, progress }) {
  console.log(progress);
  const rays = React.useMemo(() => {
    if (progress !== undefined) {
      return Array(Math.floor(12 * progress)).fill(true).map((ray, i) => (
        <div key={`ray${i}`} className={`${styles.ray} ${styles[`ray${i}`]}`} />
      ));
    }
    return <div className={styles.spin} />;
  }, [progress]);

  return (
    <div
      className={`${styles.loadingContainer} ${(loading === false || progress === 1) && styles.finished}`}
    >
      <div className={styles.centre} />
      {rays}
    </div>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool,
  progress: PropTypes.number
};

LoadingScreen.defaultProps = {
  loading: undefined,
  progress: undefined
};
