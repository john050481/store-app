import { FC } from 'react';

import { TTask } from '@api/types';

import styles from './TodoView.module.scss';

type TTodoView = {
  todo: TTask;
  onChangeTodo(todo: Partial<TTask>): void;
  onDeleteTodo: (id: TTask['id']) => void;
};

export const TodoView: FC<TTodoView> = ({ todo, onChangeTodo, onDeleteTodo }) => {
  const onToggleCompleted = () => {
    onChangeTodo({ id: todo.id, completed: !todo.completed });
  };

  const onRename: React.MouseEventHandler<HTMLDivElement> = (ev) => {
    if (ev.defaultPrevented) return;

    const newName = prompt('Task name', todo.task) || todo.task;
    onChangeTodo({ id: todo.id, task: newName });
  };

  const onDelete: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();

    onDeleteTodo(todo.id);
  };

  const onCheckboxClick: React.MouseEventHandler<HTMLInputElement> = (ev) => {
    ev.preventDefault();
  };

  return (
    <div onClick={onRename} className={styles.todoView}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggleCompleted}
        onClick={onCheckboxClick}
      />
      <span className={styles.todoView__taskTitle}>{todo.task}</span>
      <button className={styles.todoView__deleteButton} onClick={onDelete}>
        X
      </button>
    </div>
  );
};
