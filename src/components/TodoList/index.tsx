import { FC } from 'react';

import { Loader } from 'components/Loader';
import { TodoView } from './components/TodoView';
import { TTask } from '@api/types';

import styles from './TodoList.module.scss';

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

  if (isError) {
    return (
      <div className={styles.error}>
        {`Error: ${error}`}
        <button onClick={onReload}>Reload</button>
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      <Loader isLoading={isLoading} title="loading" />
      <Loader isLoading={isFetching} isSmall title="refetch" />

      {getTitle()}

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
