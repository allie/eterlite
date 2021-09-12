import React from 'react';

export default function useInterval(callback, delay) {
  const callbackRef = React.useRef();

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => callbackRef.current();
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
}
