import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RootStore } from './types';
import { createCounterSlice } from './Counter/store';
import { createTodosSlice } from './Todos/store';
import { immer } from 'zustand/middleware/immer';

export const useZustandStore = create<RootStore>()(
  devtools(
    immer((...args) => ({
      ...createCounterSlice(...args),
      ...createTodosSlice(...args),
    }))
  )
);
