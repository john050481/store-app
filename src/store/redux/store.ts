import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Counter/counterSlice';
import { pokemonApi } from './PokemonRTKQuery/services/pokemon';
import { apiTodos } from './Todos/services/todos';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [apiTodos.reducerPath]: apiTodos.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, apiTodos.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
