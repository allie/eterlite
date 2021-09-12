import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default function LoadingScreen({ loading }) {
  return (
    <div
      className={`${styles.loadingContainer} ${!loading && styles.finished}`}
    >
      <div className={styles.centre} />
      <div className={styles.circle} />
    </div>
  );
}

LoadingScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
};
