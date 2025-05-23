import { TCountStore } from './Counter/store';
import { TTodosSlice } from './Todos/store';

export type RootStore = TCountStore & TTodosSlice; // type RootStore = Slice1 & Slice2;
