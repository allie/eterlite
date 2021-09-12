import React from 'react';

import useInterval from './interval';

export default function useEaseValue(value, speed) {
  const [lastValue, setLastValue] = React.useState(value);
  const [renderValue, setRenderValue] = React.useState(value);
  const [lastUpdate, setLastUpdate] = React.useState(value);

  React.useEffect(() => {
    if (renderValue === value) {
      return;
    }
    setLastUpdate(new Date().getTime() - 16);
    setLastValue(renderValue);
  }, [value, renderValue]);

  useInterval(() => {
    const now = new Date().getTime();
    const progress = (now - lastUpdate) / speed;

    if (progress >= 1) {
      setRenderValue(value);
    } else {
      setRenderValue(lastValue + (value - lastValue) * (progress * progress));
    }
  }, 16);

  return renderValue;
}
