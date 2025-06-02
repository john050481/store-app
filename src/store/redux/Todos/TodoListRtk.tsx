import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from './services/todos';

import { getErrorMsg } from './services/helpers';
import { TodoList } from 'components/TodoList';
import { FC } from 'react';

type TTodoListProps = {
  refetchMS: number;
};

export const TodoListRtk: FC<TTodoListProps> = ({ refetchMS }) => {
  const { data, error, isLoading, isFetching, isError, refetch } = useGetTodosQuery(
    undefined,
    {
      pollingInterval: refetchMS ? refetchMS : undefined,
    }
  );

  const [
    addTodo,
    { isLoading: isLoadingAdd, isError: isErrorAdd, error: errorAdd, reset },
  ] = useAddTodoMutation();

  const [editTodo /* , {isLoading: isLoadingEdit} */] = useEditTodoMutation();

  const [deleteTodo /* , {isLoading: isLoadingDelete} */] = useDeleteTodoMutation();

  const errorMsg = [
    isError && `Error get...${getErrorMsg(error)}`,
    isErrorAdd && `Error add...${getErrorMsg(errorAdd)}`,
  ]
    .filter(Boolean)
    .join('; ');

  return (
    <TodoList
      data={data}
      error={errorMsg}
      isLoading={isLoading || isLoadingAdd}
      isFetching={isFetching}
      isError={isError || isErrorAdd}
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
