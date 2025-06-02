import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { ProcessEnum } from '@api/types';
import { useZustandStore } from '../store';
import { TodoList } from 'components/TodoList';

export const TodoListZustand = observer(() => {
  const store = useZustandStore();

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
      onChangeTodo={(...rest) => store.changeTodo(...rest)}
      onDeleteTodo={(...rest) => store.deleteTodo(...rest)}
      getTitle={() =>
        store.todos.length
          ? `Zustand: ${store.todos.filter((i) => i.completed).length}/${store.todos.length}`
          : 'Zustand: <none>'
      }
    />
  );
});
