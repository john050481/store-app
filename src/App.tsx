import React from 'react';
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

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />

        <div>Counters:</div>
        <div className={styles.wrapperFlexCol}>
          <CounterMobx />
          <CounterRedux />
          <CounterZustand />
          <CounterEffector />
        </div>

        <div>Todos:</div>
        <div className={styles.wrapperFlexCol}>
          <TodoListMobx />
          <TodoListRtk />
          <TodoListZustand />
          <TodoListEffector />
        </div>
      </header>
    </div>
  );
}

export default React.memo(App);
