import React, { useCallback } from 'react';
import debounce from 'debounce';

import icon from './icon.png';
import config from './config.json';
import styles from './styles.css';

import { useGlobalSettings, useSettings } from 'renderer/context/settings';
import { usePlugins } from 'renderer/context/plugins';

function Setting({ setting, value, setValue }) {
  const [renderValue, setRenderValue] = React.useState(value);
  const [valid, setValid] = React.useState(true);

  React.useEffect(() => {
    setRenderValue(value);
  }, [value, setRenderValue]);

  const [firstRender, setFirstRender] = React.useState(true);

  React.useLayoutEffect(() => {
    setFirstRender(false);
  }, [setFirstRender]);

  const debouncedUpdateValue = React.useCallback(debounce((v) => {
    if (!firstRender) {
      return;
    }

    setValue(v);
  }, 500), [firstRender]);

  if (setting.type === 'toggle') {
    return (
      <div className={styles.settingToggleContainer}>
        <div className={styles.settingToggleleftContainer}>
          <div className={styles.settingName}>
            {setting.label}
          </div>
          <div className={styles.settingDescription}>
            {setting.description}
          </div>
        </div>
        <div className={styles.settingToggleRightContainer}>
          <input
            type="checkbox"
            checked={renderValue}
            onChange={(e) => {
              setRenderValue(value);
              debouncedUpdateValue(e.target.checked);
            }}
          />
        </div>
      </div>
    );
  }

  const updateMultiInputItem = React.useCallback((key, itemValue, input, debounceSave = true) => {
    const newValue = {
      ...value,
      inputs: {
        ...value.inputs,
        [key]: itemValue
      }
    };

    if (renderValue !== newValue) {
      setRenderValue(newValue);
    }

    let isValid = true;

    if (input.type === 'number') {
      if (input.min && itemValue < input.min) {
        isValid = false;
      }
      if (input.max && itemValue > input.max) {
        isValid = false;
      }
    }

    setValid(isValid);

    if (isValid) {
      if (debounceSave) {
        debouncedUpdateValue(newValue);
      } else {
        setValue(newValue);
      }
    }
  }, [setting, value, setValue, renderValue, debouncedUpdateValue, setRenderValue, setValid]);

  if (setting.type === 'multiInput') {
    return (
      <div className={styles.settingContainer}>
        <div className={styles.settingName}>
          {setting.label}
        </div>
        <div className={styles.settingDescription}>
          {setting.description}
        </div>
        <div className={styles.multiInputContainer}>
          {Object.entries(setting.inputs).map(([name, input]) => (
            <div key={name} className={styles.multiInputItemContainer}>
              <div className={styles.multiInputItemLabel}>
                {input.label}:
              </div>
              {(() => {
                switch (input.type) {
                  case 'number': {
                    return (
                      <input
                        type="number"
                        value={renderValue.inputs[name]}
                        className={!valid ? styles.invalid : ''}
                        {...(input.min ? { min: input.min } : {})}
                        {...(input.max ? { max: input.max } : {})}
                        onChange={(e) => updateMultiInputItem(name, e.target.value, input, false)}
                      />
                    );
                  }
                  default:
                    return (
                      <input
                        type="text"
                        value={renderValue.inputs[name]}
                        className={!valid ? styles.invalid : ''}
                        onChange={(e) => updateMultiInputItem(name, e.target.value, input)}
                      />
                    );
                }
              })()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.settingContainer}>
      <div className={styles.settingName}>
        {setting.label}
      </div>
      <div className={styles.settingDescription}>
        {setting.description}
      </div>
    </div>
  );
}

const SettingsPlugin = {
  config,
  icon: <img src={icon} alt="Settings" />,
  Component() {
    const { settings, setSetting } = useGlobalSettings();
    const { plugins } = usePlugins();

    const debouncedUpdateClientSize = React.useCallback(debounce((clientSize) => {
      electron.setClientSize(clientSize);
    }, 500), []);

    React.useEffect(() => {
      debouncedUpdateClientSize({
        width: settings.eterlite.clientSize.inputs.width,
        height: settings.eterlite.clientSize.inputs.height
      });
    }, [settings.eterlite.clientSize, debouncedUpdateClientSize]);

    return (
      <div className={styles.settingsContainer}>
        <div className={styles.pluginContainer}>
          {Object.entries(config.settings).map(([name, setting]) => setting.label ? (
            <Setting key={name} setting={setting} value={settings.eterlite[name]} setValue={(val) => setSetting('eterlite', name, val)} />
          ) : null)}
        </div>
        {plugins && Object.entries(plugins).map(([pluginName, plugin]) => plugin.enabled && pluginName !== 'Settings' ? (
          <div key={pluginName} className={styles.pluginContainer}>
            <div className={styles.pluginHeader}>
              Plugin: {pluginName}
            </div>
            {Object.entries(plugin.module.config.settings).map(([settingName, setting]) => (
              <Setting key={settingName} setting={setting} value={settings[plugin.module.config.scope][settingName]} setValue={(val) => setSetting(plugin.module.config.scope, settingName, val)} />
            ))}
          </div>
        ) : null)}
      </div>
    );
  },
};

export default SettingsPlugin;
