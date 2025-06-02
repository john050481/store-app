import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { MobxContext } from '../index';

import { ProcessEnum } from '@api/types';
import { TodoList } from 'components/TodoList';

export const TodoListMobx = observer(() => {
  const { todoStore: store } = useContext(MobxContext);

  useEffect(() => {
    store.getAllTodos();
  }, []);

  return (
    <TodoList
      data={store.todos}
      error={store.error?.message || ''}
      isLoading={store.status === ProcessEnum.REQUESTED}
      isFetching={false}
      isError={store.status === ProcessEnum.FAILED}
      onRefetch={() => store.getAllTodos()}
      onAddTodo={(...rest) => store.addTodo(...rest)}
      onResetError={() => {}}
      onChangeTodo={store.changeTodoBindAction} // changeTodoBindAction - bind method to the correct instance
      onDeleteTodo={store.deleteTodoBindAction} // deleteTodoBindAction - bind method to the correct instance
      getTitle={() => store.report}
    />
  );
});
