import { useZustandStore } from '../store';
import { Counter } from 'components/Counter';

export function CounterZustand() {
  const count = useZustandStore((state) => state.count);
  const inc = useZustandStore((state) => state.inc);
  const dec = useZustandStore((state) => state.dec);
  const reset = useZustandStore((state) => state.reset);

  return (
    <Counter
      title="zustand"
      counter={count}
      onIncremented={inc}
      onDecremented={dec}
      onReset={() => reset(10)}
    />
  );
}
