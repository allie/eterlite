import React from 'react';
import PropTypes from 'prop-types';

const sidebarContext = React.createContext();

export const useSidebar = () => React.useContext(sidebarContext);

export function SidebarProvider({ children }) {
  // TODO: read this from config file
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState('HIGHSCORES');

  const setOpen = React.useCallback(
    (open, tab) => {
      if (tab) {
        setCurrentTab(tab);
      }
      setIsOpen(open);
      window.sidebarWasToggled = true;
      window.electron.ipcRenderer.toggleSidebar(open);
    },
    [setIsOpen, setCurrentTab]
  );

  const value = React.useMemo(
    () => ({
      sidebarIsOpen: isOpen,
      sidebarCurrentTab: currentTab,
      toggleSidebar: setOpen,
    }),
    [isOpen, currentTab, setOpen]
  );

  return (
    <sidebarContext.Provider value={value}>{children}</sidebarContext.Provider>
  );
}

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
