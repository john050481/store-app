import { FC } from 'react';

type TCounterProps = {
  title: string;
  counter: number;
  onIncremented: () => void;
  onDecremented: () => void;
  onReset: (val: number) => void;
};

export const Counter: FC<TCounterProps> = ({
  title,
  counter,
  onIncremented,
  onDecremented,
  onReset,
}) => {
  return (
    <div>
      <h4>{`${title}: ${counter}`}</h4>
      <button onClick={onIncremented}>Increment</button>
      <button onClick={onDecremented}>Decrement</button>
      <button onClick={() => onReset(10)}>Reset 10</button>
    </div>
  );
};
