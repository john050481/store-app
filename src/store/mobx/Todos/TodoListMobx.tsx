import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { MobxContext } from '../index';

import { ProcessEnum } from '@api/types';
import { TodoList } from 'components/TodoList';
import { useRefetch } from 'hooks/useRefetch';
import { useEvent } from 'hooks/useEvent';

export const TodoListMobx = observer(() => {
  const { todoStore: store } = useContext(MobxContext);

  const handleRefetch = useEvent(() => store.getAllTodos()); // bind 'this'
  const isFetching = useRefetch(handleRefetch);

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
