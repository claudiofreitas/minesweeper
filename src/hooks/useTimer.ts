import { useEffect, useState } from 'react';

interface IUseTimer {
  timerInSeconds: number;
  reset: () => void;
  start: () => void;
}

export const useTimer = (): IUseTimer => {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [timerInSeconds, setTimerInSeconds] = useState<number>(0);

  useEffect(() => {
    if (isRunning) {
      const timeoutId = setTimeout(() => {
        if (isRunning) {
          setTimerInSeconds((n) => n + 1);
        }
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isRunning]);

  const reset = () => {
    setTimerInSeconds(0);
  };

  const start = () => {
    setRunning(true);
  };

  return {
    timerInSeconds,
    reset,
    start,
  };
};
