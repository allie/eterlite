import { ipcMain } from 'electron';
import Store from 'electron-store';
import log from './log';

// Load plugin configs
// TODO: load these differently... don't want to have to hardcode them honestly
/* eslint-disable global-require */
const plugins = {
  eterlite: require('../renderer/plugins/settings/config.json'),
  highscores: require('../renderer/plugins/highscores/config.json'),
};
/* eslint-enable global-require */
log.debug('settings', 'Loaded plugin config files...');
log.silly('settings', 'Plugin configs:', plugins);

// Find all the plugin setting defaults to initialize the store with
log.debug('settings', 'Looking for defaults...');
const defaults = Object.entries(plugins).reduce((acc, [plugin, config]) => {
  log.debug('settings', `Looking for defaults for plugin "${plugin}"...`);
  let settingDefaults = {};

  // Get all the root level defaults for each setting
  Object.entries(config.settings).forEach(([key, setting]) => {
    log.silly(
      'settings',
      `Looking for default for setting "${plugin}.${key}"...`
    );

    // Setting is an object, and it has a default value
    if (typeof setting === 'object' && setting.default) {
      log.silly(
        'settings',
        `Found default for setting "${plugin}.${key}"`,
        setting.default
      );
      settingDefaults = {
        ...settingDefaults,
        [key]: setting.default,
      };
    } else {
      // Setting is not an object or does not have a default value
      // Check setting properties for an object that has a default
      log.silly(
        'settings',
        `Looking for nested defaults for setting "${plugin}.${key}"..."`
      );
      Object.entries(setting).forEach(([property, value]) => {
        log.silly(
          'settings',
          `Looking for default for nested setting "${plugin}.${key}.${property}"...`
        );

        // Nested setting is an object, and it has a default value
        if (typeof value === 'object' && value.default) {
          log.silly(
            'settings',
            `Found default for nested setting "${plugin}.${key}.${property}"`,
            value.default
          );
          settingDefaults = {
            ...settingDefaults,
            [key]: {
              ...settingDefaults[key],
              [property]: value.default,
            },
          };
        } else {
          // Nested setting is not an object or does not have a default value
          // Check nested setting properties for an object that has a default
          log.silly(
            'settings',
            `Looking for deeply nested defaults for nested setting "${plugin}.${key}.${property}"...`
          );
          Object.entries(value).forEach(([nestedProperty, nestedValue]) => {
            log.silly(
              'settings',
              `Looking for default for deeply nested setting "${plugin}.${key}.${property}.${nestedProperty}"...`
            );

            // Deeply nested setting is on object, and it has a default value
            if (typeof nestedValue === 'object' && nestedValue.default) {
              log.silly(
                'settings',
                `Found default for deeply nested setting "${plugin}.${key}.${property}.${nestedProperty}"`,
                nestedValue.default
              );
              settingDefaults = {
                ...settingDefaults,
                [key]: {
                  ...settingDefaults[key],
                  [property]: {
                    ...settingDefaults[key]?.[property],
                    [nestedProperty]: nestedValue.default,
                  },
                },
              };
            }
          });
        }
      });
    }
  });

  // If there aren't any defaults just skip
  if (Object.keys(settingDefaults).length === 0) {
    log.debug('settings', `No defaults found for plugin "${plugin}"`);
    return acc;
  }

  log.silly('settings', `Defaults for plugin "${plugin}":`, settingDefaults);

  return {
    ...acc,
    [plugin]: {
      ...settingDefaults,
    },
  };
}, {});

if (Object.keys(defaults).length > 0) {
  log.debug('settings', 'Found defaults', defaults);
} else {
  log.debug('settings', 'No defaults found for any plugin');
}

const settingsController = {
  store: null,

  init() {
    log.debug('settings', 'Initializing...');
    this.store = new Store({
      defaults,
    });
    log.silly('settings', 'Initialized store:', this.store.store);

    ipcMain.on('sync-settings', (event) => {
      log.debug('settings', 'Received ipc message "sync-settings"');
      log.silly('settings', 'Replying to "sync-settings"...', this.store.store);
      event.reply('sync-settings', this.store.store);
    });

    ipcMain.on('set-setting', (event, { scope, setting, value }) => {
      log.debug('settings', 'Received ipc message "set-settings"', { scope, setting, value });
      this.writeSetting(scope, setting, value);
      log.silly('settings', 'Syncing settings after update...', this.store.store);
      event.reply('sync-settings', this.store.store);
    });
  },

  writeSetting(scope, name, value) {
    this.store.set(`${scope}.${name}`, value);
    log.debug('settings', `Wrote setting "${scope}.${name}":`, value);
  },

  getSetting(scope, name) {
    const value = this.store.get(`${scope}.${name}`);
    log.debug('settings', `Got setting "${scope}.${name}":`, value);
    return value;
  },

  getAll() {
    log.debug('settings', 'Got whole store:', this.store.store);
    return this.store.store;
  },

  clear() {
    this.store.clear();
    log.debug('settings', 'Cleared store');
  },
};

export default settingsController;
