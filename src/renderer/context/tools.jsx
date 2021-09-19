import React from 'react';
import PropTypes from 'prop-types';

import ScreenshotTool from 'renderer/tools/screenshot';

const ALL_TOOLS = [
  {
    module: ScreenshotTool,
    defaultEnabled: true,
    canToggle: true,
  },
];

const toolsContext = React.createContext();

export const useTools = () => React.useContext(toolsContext);

export function ToolsProvider({ children }) {
  // Full set of tools, each with a toggle to enable or disable
  // A default set of tools is enabled, and then overridden by
  // the user's saved preferences
  const [tools, setTools] = React.useState({
    ...ALL_TOOLS.reduce(
      (acc, tool) => ({
        ...acc,
        [tool.module.name]: {
          module: tool.module,
          enabled: tool.defaultEnabled,
          canToggle: tool.canToggle,
        },
      }),
      {}
    ),
    // TODO: spread enabled tools from a config file
  });

  const enabledTools = React.useMemo(
    () =>
      Object.entries(tools).reduce(
        (acc, [, tool]) => [...acc, ...(tool.enabled ? [tool.module] : [])],
        []
      ),
    [tools]
  );

  // Enable or disable a tool by name
  const toggleTool = React.useCallback(
    (name, enabled) => {
      setTools((oldTools) => {
        if (!oldTools[name]) {
          return oldTools;
        }

        if (!oldTools[name].canToggle) {
          return oldTools;
        }

        return {
          ...oldTools,
          [name]: {
            ...oldTools[name],
            enabled,
          },
        };
      });
    },
    [setTools]
  );

  const value = React.useMemo(
    () => ({
      tools,
      enabledTools,
      toggleTool,
    }),
    [tools, enabledTools, toggleTool]
  );

  return (
    <toolsContext.Provider value={value}>{children}</toolsContext.Provider>
  );
}

ToolsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
