import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { MobxContext } from '..';
import { Counter } from 'components/Counter';

export const CounterMobx = observer(function CounterMobx() {
  const { counterStore } = useContext(MobxContext);

  return (
    <Counter
      title="mobx"
      counter={counterStore.count}
      onIncremented={() => counterStore.inc()}
      onDecremented={() => counterStore.dec()}
      onReset={() => counterStore.reset(10)}
    />
  );
});
