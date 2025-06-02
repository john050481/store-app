import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { MobxContext } from '../index';

import { ProcessEnum } from '@api/types';
import { TodoList } from 'components/TodoList';
import { useRefetch } from 'hooks/useRefetch';
import { useEvent } from 'hooks/useEvent';

type TTodoListProps = {
  refetchMS: number;
};

export const TodoListMobx: FC<TTodoListProps> = observer(({ refetchMS }) => {
  const { todoStore: store } = useContext(MobxContext);

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
      onChangeTodo={store.changeTodoBindAction} // changeTodoBindAction - bind method to the correct instance
      onDeleteTodo={store.deleteTodoBindAction} // deleteTodoBindAction - bind method to the correct instance
      getTitle={() => store.report}
    />
  );
});
