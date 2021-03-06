import React from 'react';
// import { useSettings } from 'renderer/context/settings';
import styles from './styles.css';

import icon from './icon.png';
import config from './config.json';

const placeStyles = [styles.first, styles.second, styles.third];

const HighscoresPlugin = {
  config,
  icon: <img src={icon} alt="Highscores" />,
  Component() {
    const [data, setData] = React.useState([]);
    const [hasError, setHasError] = React.useState(false);
    // const { settings } = useSettings();

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
        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => fetchData()}
        >
          Refresh
        </button>
        <div className={styles.dataHeader}>
          <span className={styles.rank}>#</span>
          <span className={styles.name}>Player</span>
          <div className={styles.levelHeader}>Level</div>
        </div>
        <div className={styles.dataContainer}>
          {data.map((player, i) => (
            <div className={styles.row} key={player.name}>
              <span className={styles.rank}>{i + 1}</span>
              <span className={`${styles.name} ${i < 3 && placeStyles[i]}`}>
                {player.name}
              </span>
              <div className={styles.levelContainer}>
                <span className={styles.level}>{player.level}</span>
                &nbsp;
                <span className={styles.exp}>
                  +&nbsp;
                  <span className={styles.innerExp}>{player.exp}</span>
                  &nbsp;xp
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export default HighscoresPlugin;
