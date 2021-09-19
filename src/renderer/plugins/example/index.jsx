// This file is an example of an Eterlite plugin, and can be used
// as a template for building additional plugins.

// Firstly, there are two files that need to exist in order to build a plugin.
// These files are:
//   * index.jsx - The file you're reading now, which exports the plugin module,
//                 contains the React component to render in the Settings panel.
//   * config.json - Contains all the metadata about the plugin and its settings.

// You will need to import React in order to build a plugin, because a plugin
// is essentially just a React component with some extra metadata.
import React from 'react';

// config.json includes properties such as the name, version, and author, as well
// as configuration for the settings that the plugin will interface with. Check the
// config.json file in this directory for an example of how it should look.
import config from './config.json';
// This is the icon for the plugin. This icon will be shown in the plugin's
// toolbar button. The icon size should be 18x18 pixels (and hopefully match
// the visual style of the other buttons).
import icon from './icon.png';
// Styles for the component can be used here. Eterlite uses CSS modules, so
// you can apply styles to an element by passing `className={styles.myModule}`
// as a prop to the element you wish to style.
import styles from './styles.css';

// useSettings is a hook that will give you access to plugin-scoped settings,
// allowing you to get and set their values.
// import { useSettings } from 'renderer/context/settings';

// This is the plugin module that is exported for Eterlite to use. It needs to
// have the following properties:
//   * config
//   * icon
//   * Component
const plugin = {
  // `config` is an object containing configuration properties for the plugin.
  // Import this from your config.json file.
  config,
  // `icon` is a node to display on the toolbar button. Generally, this is just
  // an `img` element, with the `src` prop set to the icon you imported.
  icon: <img src={icon} alt="Highscores" />,
  // `Component` is the React component that will render in the sidebar plugin panel.
  Component() {
    // Here is an example of how you can use the `useSettings` hook in order to both
    // retrieve and setSettings within your plugin's React component.
    // const { settings } = useSettings();
    // console.log(settings?.thingIsEnabled);

    // Note: the content you render will be displayed within a 320px-wide sidebar,
    // which has scrolling disabled. If you need scrolling, you will need to add
    // it in your plugin's styling.
    return <div className={styles.exampleModule}>Hello world!</div>;
  },
};

// Finally, export it!
export default plugin;
