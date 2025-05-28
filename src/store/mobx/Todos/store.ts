import { action, autorun, computed, makeObservable, observable } from 'mobx';
import { api } from '@api';
import { ProcessEnum } from '@api/types';

import { AxiosError } from 'axios';

export type TTask = {
  id: string;
  task: string;
  completed: boolean;
};

export class ObservableTodoStore {
  rootStore: any;
  todos: TTask[] = [];
  status: ProcessEnum = ProcessEnum.INITIAL;
  error: Error | AxiosError | null = null;

  constructor(rootStore: any) {
    this.rootStore = rootStore;

    makeObservable(this, {
      todos: observable,
      status: observable,
      completedTodosCount: computed,
      report: computed,
      getAllTodos: action,
      addTodo: action,
      changeTodoBindAction: action.bound, // action.bound - bind a method to the correct instance
      deleteTodoBindAction: action.bound, // action.bound - bind a method to the correct instance
    });
    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  get report() {
    if (this.todos.length === 0) return 'Mobx: <none>';
    return `Mobx: ${this.completedTodosCount}/${this.todos.length}`;
  }

  changeTodoBindAction(todo: Partial<TTask>) {
    this.status = ProcessEnum.REQUESTED;

    api
      .patch<TTask>(`/todos/${todo.id}`, todo)
      .then((res) => res.data)
      .then(
        action('changeTodoBindAction Success', (todoRes) => {
          const indexTodo = this.todos.findIndex((item) => item.id === todo.id);
          if (indexTodo >= 0) this.todos[indexTodo] = todoRes;
          this.status = ProcessEnum.SUCCEEDED;
          this.error = null;
        })
      )
      .catch(
        action('changeTodoBindAction Error', (error) => {
          this.error = error;
          this.status = ProcessEnum.FAILED;
        })
      );
  }

  getAllTodos() {
    this.todos = [];
    this.status = ProcessEnum.REQUESTED;

    api
      .get<TTask[]>('/todos')
      .then((res) => res.data)
      .then(
        action('getAllTodos Success', (todos) => {
          this.todos = todos;
          this.status = ProcessEnum.SUCCEEDED;
          this.error = null;
        })
      )
      .catch(
        action('getAllTodos Error', (error) => {
          this.todos = [];
          this.error = error;
          this.status = ProcessEnum.FAILED;
        })
      );
  }

  addTodo({ task }: { task: string }) {
    this.status = ProcessEnum.REQUESTED;

    const newTask = {
      task,
      completed: false,
    };

    api
      .post<TTask>('/todos', newTask)
      .then((res) => res.data)
      .then(
        action('addTodo Success', (todo) => {
          this.todos.push(todo);
          this.status = ProcessEnum.SUCCEEDED;
          this.error = null;
        })
      )
      .catch(
        action('addTodo Error', (error) => {
          this.error = error;
          this.status = ProcessEnum.FAILED;
        })
      );
  }

  deleteTodoBindAction(id: TTask['id']) {
    this.status = ProcessEnum.REQUESTED;

    api
      .delete<TTask>(`/todos/${id}`)
      .then((res) => res.data)
      .then(
        action('deleteTodoBindAction Success', (todo) => {
          this.todos = this.todos.filter((item) => item.id !== id);
          this.status = ProcessEnum.SUCCEEDED;
          this.error = null;
        })
      )
      .catch(
        action('deleteTodoBindAction Error', (error) => {
          this.error = error;
          this.status = ProcessEnum.FAILED;
        })
      );
  }
}
