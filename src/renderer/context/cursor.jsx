import React from 'react';
import PropTypes from 'prop-types';
import { useGlobalSettings } from './settings';

import bcBroad from 'renderer/cursors/bcBroad';
import bcDagger from 'renderer/cursors/bcDagger';
import bcLong from 'renderer/cursors/bcLong'
import bcSword from 'renderer/cursors/bcSword'
import boneSword from 'renderer/cursors/boneSword';
import club from 'renderer/cursors/club';
import cookedCatfish from 'renderer/cursors/cookedCatfish'
import cookedCod from 'renderer/cursors/cookedCod';
import cookedEel from 'renderer/cursors/cookedEel';
import cookedHerring from 'renderer/cursors/cookedHerring'
import cookedSardine from 'renderer/cursors/cookedSardine'
import fishingRod from 'renderer/cursors/fishingRod'
import flyFishingRod from 'renderer/cursors/flyFishingRod'
import goldHelm from 'renderer/cursors/goldHelm'
import iceSword from 'renderer/cursors/iceSword'
import ironClub from 'renderer/cursors/ironClub'
import katalynsDagger from 'renderer/cursors/katalynsDagger';
import orcolsWrath from 'renderer/cursors/orcolsWrath';

const ALL_CURSORS = [
  bcBroad,
  bcDagger,
  bcLong,
  bcSword,
  boneSword,
  club,
  cookedCatfish,
  cookedCod,
  cookedEel,
  cookedHerring,
  cookedSardine,
  fishingRod,
  flyFishingRod,
  goldHelm,
  iceSword,
  ironClub,
  katalynsDagger,
  orcolsWrath,
];

const cursorContext = React.createContext({});

export function CursorProvider({ children }) {
  const { settings } = useGlobalSettings();

  React.useLayoutEffect(() => {
    if (!settings.eterlite?.cursor) {
      return;
    }

    if (settings.eterlite.cursor === '') {
      document.body.style.cursor = 'auto';
    } else {
      const cursor = ALL_CURSORS.find(c => c.id === settings.eterlite.cursor);
      document.body.style.setProperty('cursor', `url(${cursor.image}) ${cursor.left || 0} ${cursor.top || 0}, auto`, 'important');
    }
  }, [settings.eterlite?.cursor]);

  return (
    <cursorContext.Provider>{children}</cursorContext.Provider>
  );
}

CursorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
