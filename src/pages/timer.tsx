import { NextPage } from 'next';
import { useTimer } from '../hooks/useTimer';

const Timer: NextPage = () => {
  const {
    units: seconds,
    start,
    stop,
    reset,
  } = useTimer({
    initialUnits: 60,
    frequency: 60,
  });

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <div className="text-9xl tabular-nums">{seconds}</div>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default Timer;
