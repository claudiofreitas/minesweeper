import { useEffect, useState } from 'react';

interface IUseTimer {
  units: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
}

interface TimerOptions {
  frequency: number;
  isRunning: boolean;
  initialUnits: number;
}

const defaultOptions: TimerOptions = {
  frequency: 1,
  isRunning: false,
  initialUnits: 0,
};

export const useTimer = (options?: Partial<TimerOptions>): IUseTimer => {
  const {
    frequency,
    isRunning: initialIsRunning,
    initialUnits,
  } = {
    ...defaultOptions,
    ...options,
  };

  const [units, setUnits] = useState(initialUnits);
  const [isRunning, setIsRunning] = useState<boolean>(initialIsRunning);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (isRunning) {
      timeoutId = setTimeout(() => {
        setUnits((s) => s + 1);
      }, 1000 / frequency);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [units, frequency, isRunning, setUnits]);

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setUnits(0);
  };

  return {
    units,
    start,
    stop,
    reset,
    isRunning,
  };
};
