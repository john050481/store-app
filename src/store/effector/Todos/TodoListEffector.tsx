import {
  $todos,
  addTodoEf,
  changeTodoEf,
  deleteTodoEf,
  getAllTodosEf,
  $isLoading,
  $error,
  resetErrorEvent,
} from './store';
import { TodoList } from 'components/TodoList';
import { useUnit } from 'effector-react';
import { useRefetch } from 'hooks/useRefetch';
import { useEvent } from 'hooks/useEvent';
import { FC } from 'react';

type TTodoListProps = {
  refetchMS: number;
};

export const TodoListEffector: FC<TTodoListProps> = ({ refetchMS }) => {
  const [
    todos,
    addTodo,
    changeTodo,
    deleteTodo,
    getAllTodos,
    isLoading,
    error,
    resetError,
  ] = useUnit([
    $todos,
    addTodoEf,
    changeTodoEf,
    deleteTodoEf,
    getAllTodosEf,
    $isLoading,
    $error,
    resetErrorEvent,
  ]);

  const handleRefetch = useEvent(() => {
    resetError();
    return getAllTodos();
  });
  const isFetching = useRefetch(handleRefetch, refetchMS);

  return (
    <TodoList
      data={todos || []}
      error={error || ''}
      isLoading={isLoading && !isFetching}
      isFetching={isFetching}
      isError={!!error}
      onRefetch={handleRefetch}
      onAddTodo={addTodo}
      onResetError={resetError}
      onChangeTodo={changeTodo}
      onDeleteTodo={deleteTodo}
      getTitle={() =>
        todos?.length
          ? `Effector: ${todos.filter((i) => i.completed).length}/${todos.length}`
          : 'Effector: <none>'
      }
    />
  );
};
