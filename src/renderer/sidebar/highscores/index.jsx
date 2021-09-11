import React from 'react';
import styles from './styles.css';

export default function Highscores() {
  const [data, setData] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);

  // Fetch highscores data from the API
  const fetchData = React.useCallback(() => {
    fetch('https://eterspire.com/highscores_api.php')
      .then((res) => {
        if (res.status !== 200) {
          return setHasError(true);
        }
        return res.json().then((json) => {
          return setData(json);
        });
      })
      .catch((err) => {
        return setHasError(true);
      });
  }, [setHasError, setData]);

  // Fetch data once on load
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (hasError) {
    return null;
  }

  return (
    <div className={styles.highscoresContainer}>
      <div className={styles.header}>Highscores</div>
      <div className={styles.dataHeader}>
        <span className={styles.rank}>#</span>
        <span className={styles.name}>Player</span>
        <div className={styles.levelContainer}>Level</div>
      </div>
      <div className={styles.dataContainer}>
        {data.map((player, i) => (
          <div className={styles.row} key={player.name}>
            <span className={styles.rank}>{i + 1}</span>
            <span className={styles.name}>{player.name}</span>
            <div className={styles.levelContainer}>
              <span className={styles.level}>{player.level}</span>
              &nbsp;
              <span className={styles.exp}>{`(+${player.exp} exp)`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
