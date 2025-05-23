import { useUnit } from 'effector-react';

import { $counter, incremented, decremented, reset } from './store';
import { Counter } from 'components/Counter';

export const CounterEffector = () => {
  const [counter, onIncremented, onDecremented] = useUnit([
    $counter,
    incremented,
    decremented,
  ]);

  return (
    <Counter
      title="effector"
      counter={counter}
      onIncremented={onIncremented}
      onDecremented={onDecremented}
      onReset={() => reset(10)}
    />
  );
};
