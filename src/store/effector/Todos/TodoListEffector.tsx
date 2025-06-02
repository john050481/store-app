import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import {
  $todos,
  addTodoEf,
  changeTodoEf,
  deleteTodoEf,
  getAllTodosEf,
  $isLoading,
  $error,
  resetErrorEf,
} from './store';
import { TodoList } from 'components/TodoList';
import { useUnit } from 'effector-react';

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
    resetErrorEf,
  ]);

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <TodoList
      data={todos || []}
      error={error || ''}
      isLoading={isLoading}
      isFetching={false}
      isError={!!error}
      onRefetch={getAllTodos}
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
