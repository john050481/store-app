import { ProcessEnum } from '@api/types';
import { useZustandStore } from '../store';
import { TodoList } from 'components/TodoList';
import { useRefetch } from 'hooks/useRefetch';
import { useEvent } from 'hooks/useEvent';
import { FC } from 'react';

type TTodoListProps = {
  refetchMS: number;
};

export const TodoListZustand: FC<TTodoListProps> = ({ refetchMS }) => {
  const store = useZustandStore();

  const handleRefetch = useEvent(() => store.getAllTodos()); // bind 'this'
  const isFetching = useRefetch(handleRefetch, refetchMS);

  return (
    <TodoList
      data={store.todos}
      error={store.error?.message || ''}
      isLoading={store.status === ProcessEnum.REQUESTED && !isFetching}
      isFetching={isFetching}
      isError={store.status === ProcessEnum.FAILED}
      onRefetch={handleRefetch}
      onAddTodo={(...rest) => store.addTodo(...rest)}
      onResetError={() => {}}
      onChangeTodo={(...rest) => store.changeTodo(...rest)}
      onDeleteTodo={(...rest) => store.deleteTodo(...rest)}
      getTitle={() =>
        store.todos.length
          ? `Zustand: ${store.todos.filter((i) => i.completed).length}/${store.todos.length}`
          : 'Zustand: <none>'
      }
    />
  );
};
