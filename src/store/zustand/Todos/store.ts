import { StateCreator } from 'zustand';

import { api } from '@api';
import { RootStore } from '../types';
import { ProcessEnum } from '@api/types';
import { AxiosError } from 'axios';
import { TTask } from '@api/types';

export type TTodosSlice = {
  todos: TTask[];
  status: ProcessEnum;
  error: Error | AxiosError | null;
  getAllTodos: () => Promise<TTask[]>;
  addTodo: (props: { task: string }) => Promise<TTask>;
  deleteTodo: (id: TTask['id']) => Promise<TTask>;
  changeTodo: (todo: Partial<TTask>) => Promise<TTask>;
};

export const createTodosSlice: StateCreator<
  RootStore,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  TTodosSlice
> = (set) => ({
  todos: [],
  status: ProcessEnum.INITIAL,
  error: null,

  async getAllTodos() {
    set({ status: ProcessEnum.REQUESTED }, undefined, 'getAllTodos: request');

    return api
      .get<TTask[]>('/todos')
      .then((res) => res.data)

      .then((todos) => {
        set(
          (state) => {
            // immer mutation
            state.todos = todos;
            state.status = ProcessEnum.SUCCEEDED;
            state.error = null;
          },
          undefined,
          'getAllTodos: success'
        );
        return todos;
      })
      .catch((error) => {
        set(
          (state) => {
            // immer mutation
            state.todos = [];
            state.status = ProcessEnum.FAILED;
            state.error = error;
          },
          undefined,
          'getAllTodos: error'
        );
        return error;
      });
  },

  async addTodo({ task }) {
    set({ status: ProcessEnum.REQUESTED }, undefined, 'addTodo:requested');

    const newTask = {
      task,
      completed: false,
    };

    return api
      .post<TTask>('/todos', newTask)
      .then((res) => res.data)
      .then((todo) => {
        set(
          (state) => {
            // immer mutation
            state.todos.push(todo);
            state.status = ProcessEnum.SUCCEEDED;
            state.error = null;
          },
          undefined,
          'addTodo: success'
        );
        return todo;
      })
      .catch((error) => {
        set(
          (state) => {
            // immer mutation
            state.status = ProcessEnum.FAILED;
            state.error = error;
          },
          undefined,
          'addTodo: error'
        );
        return error;
      });
  },
  async deleteTodo(id: TTask['id']) {
    set({ status: ProcessEnum.REQUESTED }, undefined, 'deleteTodo:requested');

    return api
      .delete<TTask>(`/todos/${id}`)
      .then((res) => res.data)
      .then((todo) => {
        // without immer
        set(
          (state) => ({
            todos: state?.todos?.filter((item) => item.id !== id),
            status: ProcessEnum.SUCCEEDED,
            error: null,
          }),
          undefined,
          'deleteTodo: success'
        );
        return todo;
      })
      .catch((error) => {
        // without immer
        set(
          { status: ProcessEnum.FAILED, error },
          undefined,
          'deleteTodo: error'
        );
        return error;
      });
  },
  async changeTodo(todo: Partial<TTask>) {
    set({ status: ProcessEnum.REQUESTED }, undefined, 'changeTodo:requested');

    return api
      .patch<TTask>(`/todos/${todo.id}`, todo)
      .then((res) => res.data)
      .then((todoRes) => {
        set(
          (state) => {
            // immer mutation
            const indexTodo = state.todos.findIndex(
              (item) => item.id === todo.id
            );
            if (indexTodo >= 0) state.todos[indexTodo] = todoRes;
            state.status = ProcessEnum.SUCCEEDED;
            state.error = null;
          },
          undefined,
          'changeTodo: success'
        );
        return todoRes;
      })
      .catch((error) => {
        // without immer
        set(
          { status: ProcessEnum.FAILED, error },
          undefined,
          'changeTodo: error'
        );
        return error;
      });
  },
});
