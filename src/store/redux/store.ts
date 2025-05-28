import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Counter/counterSlice';
import { apiTodos } from './Todos/services/todos';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiTodos.reducerPath]: apiTodos.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiTodos.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
