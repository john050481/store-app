import React, { useState } from 'react';
import logo from './logo.svg';
import { CounterRedux } from './store/redux/Counter';
import { CounterEffector } from './store/effector/Counter';

import styles from './App.module.scss';
import { TodoListMobx } from './store/mobx/Todos/TodoListMobx';
import { CounterZustand } from './store/zustand/Counter';
import { CounterMobx } from './store/mobx/Counter';
import { TodoListRtk } from 'store/redux/Todos/TodoListRtk';
import { TodoListZustand } from 'store/zustand/Todos/TodoListZustand';
import { TodoListEffector } from 'store/effector/Todos/TodoListEffector';
import { DEFAULT_REFETCH_MS, DEFAULT_TIMEOUT_MS } from '@api/constants';
import { Select } from 'components/Select';

const REFETCH_OPTIONS = [
  { value: DEFAULT_REFETCH_MS, label: `${DEFAULT_REFETCH_MS / 1000} sec` },
  { value: 5000, label: '5 sec' },
  { value: 10000, label: '10 sec' },
  { value: 0, label: 'none' },
];

function App() {
  const [refetchMS, setRefetchMS] = useState(REFETCH_OPTIONS[0].value);

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />

        <div>Counters</div>
        <div className={styles.wrapperFlexCol}>
          <CounterMobx />
          <CounterRedux />
          <CounterZustand />
          <CounterEffector />
        </div>

        <hr style={{ width: '90%' }} />

        <div>{`Todos (timeout API = ${DEFAULT_TIMEOUT_MS}ms)`}</div>
        <Select
          title="AutoUpdate/Refetch, seconds: "
          options={REFETCH_OPTIONS}
          value={refetchMS}
          onSelect={(val) => setRefetchMS(+val)}
        />
        <div className={styles.wrapperFlexCol}>
          <TodoListMobx refetchMS={refetchMS} />
          <TodoListRtk refetchMS={refetchMS} />
          <TodoListZustand refetchMS={refetchMS} />
          <TodoListEffector refetchMS={refetchMS} />
        </div>
      </header>
    </div>
  );
}

export default React.memo(App);
