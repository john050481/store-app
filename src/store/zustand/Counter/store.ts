import { StateCreator } from 'zustand';
import { RootStore } from '../types';

export type TCountStore = {
  count: number;
  inc: () => void;
  dec: () => void;
  reset: (by: number) => void;
};

export const createCounterSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never]],
  [],
  TCountStore
> = (set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 }), undefined, 'counter:inc'),
  dec: () => set((state) => ({ count: state.count - 1 }), undefined, 'counter:dec'),
  reset: (by) => set({ count: by }, undefined, 'counter:reset'),
});
