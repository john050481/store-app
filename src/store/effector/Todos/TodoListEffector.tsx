import { observer } from 'mobx-react-lite';

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

export const TodoListEffector = observer(() => {
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
  const isFetching = useRefetch(handleRefetch);

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
});
