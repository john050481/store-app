import React from 'react';
import logo from './logo.svg';
import { CounterRedux } from './store/redux/Counter';
import AppPokemon from './store/redux/PokemonRTKQuery/AppPokemon';
import { CounterEffector } from './store/effector/Counter';
import { PostsEffector } from './store/effector/Posts/PostsEffector';

import styles from './App.module.scss';
import { TodoListMobx } from './store/mobx/Todos/TodoListMobx';
import { CounterZustand } from './store/zustand/Counter';
import { CounterMobx } from './store/mobx/Counter';
import { TodoListRtk } from 'store/redux/Todos/TodoListRtk';
import { TodoListZustand } from 'store/zustand/Todos/TodoListZustand';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className={styles.wrapperFlexCol}>
          <CounterMobx />
          <CounterRedux />
          <CounterZustand />
          <CounterEffector />
        </div>
        <div className={styles.wrapperFlexCol}>
          <TodoListMobx />
          <TodoListRtk />
          <TodoListZustand />
          <PostsEffector />
          <AppPokemon />
        </div>
      </header>
    </div>
  );
}

export default React.memo(App);
