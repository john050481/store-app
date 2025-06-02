import { createEvent, createStore, createEffect, sample } from 'effector';
import { AxiosError } from 'axios';

import { api } from '@api';
import { TTask } from '@api/types';

// todos -----------------------------------------------------------------
export const $todos = createStore<TTask[] | null>(null);

const setTodosEvent = createEvent<TTask[] | null>();
const changeTodoEvent = createEvent<TTask>();
const deleteTodoEvent = createEvent<TTask>();
const addTodoEvent = createEvent<TTask>();

$todos.on([setTodosEvent], (_, todos) => todos);
$todos.on([changeTodoEvent], (state, todo) =>
  state?.map((item) => (item.id === todo.id ? todo : item))
);
$todos.on([deleteTodoEvent], (state, todo) =>
  state?.filter((item) => item.id !== todo.id)
);
$todos.on([addTodoEvent], (state, todo) => [...(state || []), todo]);

// getAllTodosEf -----------------------------------------------------------------
export const getAllTodosEf = createEffect<void, TTask[], AxiosError>(
  async () => {
    const res = await api.get<TTask[]>('/todos').then((res) => res.data);

    return res;
  }
);
getAllTodosEf.doneData.watch((todos) => setTodosEvent(todos));

// addTodoEf -----------------------------------------------------------------
export const addTodoEf = createEffect<Pick<TTask, 'task'>, TTask, AxiosError>(
  async ({ task }) => {
    const newTask = {
      task,
      completed: false,
    };

    const res = await api
      .post<TTask>('/todos', newTask)
      .then((res) => res.data);

    return res;
  }
);
addTodoEf.doneData.watch((todo) => addTodoEvent(todo));

// deleteTodoEf -----------------------------------------------------------------
export const deleteTodoEf = createEffect<TTask['id'], TTask, AxiosError>(
  async (id: TTask['id']) => {
    const res = await api.delete<TTask>(`/todos/${id}`).then((res) => res.data);

    return res;
  }
);
deleteTodoEf.doneData.watch((todo) => deleteTodoEvent(todo));

// changeTodoEf -----------------------------------------------------------------
export const changeTodoEf = createEffect<Partial<TTask>, TTask, AxiosError>(
  async (todo) => {
    const res = await api
      .patch<TTask>(`/todos/${todo.id}`, todo)
      .then((res) => res.data);

    return res;
  }
);
changeTodoEf.doneData.watch((todo) => changeTodoEvent(todo));

// isLoading and error-----------------------------------------------------------------
export const $isLoading = createStore(false);
const setIsLoadingEvent = createEvent<boolean>();
$isLoading.on(setIsLoadingEvent, (_, newIsLoading) => newIsLoading);
sample({
  clock: [
    getAllTodosEf.pending,
    addTodoEf.pending,
    deleteTodoEf.pending,
    changeTodoEf.pending,
  ],
  source: [
    getAllTodosEf.pending,
    addTodoEf.pending,
    deleteTodoEf.pending,
    changeTodoEf.pending,
  ],
  fn: (rest) => rest.some((item) => !!item),
  target: setIsLoadingEvent,
});

export const $error = createStore<string | null>(null);
$error.on(
  [getAllTodosEf.fail, addTodoEf.fail, deleteTodoEf.fail, changeTodoEf.fail],
  (_, { error }) => error.message
);
export const resetErrorEvent = createEvent();
$error.on(resetErrorEvent, () => null);
