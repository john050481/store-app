import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from './services/todos';

import { getErrorMsg } from './services/helpers';
import { TodoList } from 'components/Todos';

export const TodoListRtk = () => {
  const { data, error, isLoading, isFetching, isError, refetch } =
    useGetTodosQuery();

  const [
    addTodo,
    {
      isLoading: isLoadingAddTodo,
      isError: isErrorAddTodo,
      error: errorAddTodo,
      reset,
    },
  ] = useAddTodoMutation();

  const [editTodo /* , {isLoading} */] = useEditTodoMutation();

  const [deleteTodo /* , {isLoading} */] = useDeleteTodoMutation();

  const errorMsg = [
    isError && `Error get...${getErrorMsg(error)}`,
    isErrorAddTodo && `Error add...${getErrorMsg(errorAddTodo)}`,
  ]
    .filter(Boolean)
    .join('; ');

  return (
    <TodoList
      data={data}
      error={errorMsg}
      isLoading={isLoading || isLoadingAddTodo}
      isFetching={isFetching}
      isError={isError || isErrorAddTodo}
      onRefetch={refetch}
      onAddTodo={addTodo}
      onResetError={reset}
      onChangeTodo={editTodo}
      onDeleteTodo={deleteTodo}
      getTitle={() =>
        data?.length
          ? `Redux RTKq: ${data.filter((i) => i.completed).length}/${data.length}`
          : 'Redux RTKq: <none>'
      }
    />
  );
};
