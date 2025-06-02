import { FC } from 'react';

import styles from './Counter.module.scss';

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
    <div className={styles.counter}>
      <h4>{`${title}: ${counter}`}</h4>
      <div className={styles.counter__buttons}>
        <button onClick={onIncremented}>+ 1</button>
        <button onClick={onDecremented}>- 1</button>
        <button onClick={() => onReset(10)}>&#10227; 10</button>
      </div>
    </div>
  );
};
