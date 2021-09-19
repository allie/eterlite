import React from 'react';
import ContentEditable from 'react-contenteditable';
import debounce from 'debounce';

import { useSettings } from 'renderer/context/settings';
import styles from './styles.css';

import icon from './icon.png';
import config from './config.json';

const NotesPlugin = {
  config,
  icon: <img src={icon} alt="Notes" />,
  Component() {
    const { settings, setSetting } = useSettings();

    return (
      <ContentEditable
        className={styles.notesContainer}
        onChange={(e) =>
          debounce(setSetting, 500)('savedNotes', e.target.value)
        }
      />
    );
  },
};

export default NotesPlugin;
