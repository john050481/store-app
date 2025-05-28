import { FC } from 'react';

import styles from './TodoList.module.scss';
import { Loader } from 'components/Loader';

type TTask = {
  id: string;
  task: string;
  completed: boolean;
};

type TTodoList = {
  data: TTask[] | undefined;
  error: string;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onRefetch: () => void;
  onAddTodo: (props: { task: string }) => void;
  onResetError: () => void;

  onChangeTodo: (todo: Partial<TTask> & Pick<TTask, 'id'>) => void;
  onDeleteTodo: (id: TTask['id']) => void;

  getTitle: () => string;
};

export const TodoList: FC<TTodoList> = ({
  data,
  error,
  isLoading,
  isFetching,
  isError,
  onRefetch,
  onAddTodo,
  onResetError,
  onChangeTodo,
  onDeleteTodo,
  getTitle,
}) => {
  const onNewTodo = () => {
    const newTask = prompt('Enter a new todo:', 'coffee plz');
    newTask && onAddTodo({ task: newTask });
  };

  const onReload = () => {
    onResetError();
    onRefetch();
  };

  // if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div>
        {isError && `Error: ${error}`}
        <button onClick={onReload}>Reload</button>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      <Loader isLoading={isLoading} title="loading" />
      {getTitle()}
      <Loader isLoading={isFetching} isSmall title="refetch" />
      <hr />
      <div>
        {data?.map((todo) => (
          <TodoView
            key={todo.id}
            todo={todo}
            onChangeTodo={onChangeTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </div>
      <hr />
      <div className={styles.listFooter}>
        <small> (click a title to edit)</small>
        <button onClick={onNewTodo}>New Todo</button>
        <button onClick={onReload}>Reload</button>
      </div>
    </div>
  );
};

type TTodoView = {
  todo: TTask;
  onChangeTodo(todo: Partial<TTask>): void;
  onDeleteTodo: (id: TTask['id']) => void;
};

const TodoView: FC<TTodoView> = ({ todo, onChangeTodo, onDeleteTodo }) => {
  const onToggleCompleted = () => {
    onChangeTodo({ id: todo.id, completed: !todo.completed });
  };

  const onRename: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (ev.defaultPrevented) return;

    const newName = prompt('Task name', todo.task) || todo.task;
    onChangeTodo({ id: todo.id, task: newName });
  };

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();

    onDeleteTodo(todo.id);
  };

  const onCheckboxClick: React.MouseEventHandler<HTMLInputElement> = (ev) => {
    ev.preventDefault();
  };

  return (
    <div onClick={onRename} className={styles.todoView}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggleCompleted}
        onClick={onCheckboxClick}
      />
      {todo.task}
      <button onClick={onDelete}>X</button>
    </div>
  );
};
