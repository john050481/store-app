import type { RootState } from '../store';
import { decrement, increment, reset } from './counterSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Counter } from 'components/Counter';

export function CounterRedux() {
  const counter = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Counter
      title="redux"
      counter={counter}
      onIncremented={() => dispatch(increment())}
      onDecremented={() => dispatch(decrement())}
      onReset={() => dispatch(reset(10))}
    />
  );
}
