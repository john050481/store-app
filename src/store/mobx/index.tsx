import { createContext, FC, ReactNode } from 'react';

import { ObservableTodoStore } from './Todos/store';
import { ObservableCounterStore } from './Counter/store';
import { injectStores } from '@mobx-devtools/tools';

class RootStore {
  counterStore: InstanceType<typeof ObservableCounterStore>;
  todoStore: InstanceType<typeof ObservableTodoStore>;

  constructor() {
    this.counterStore = new ObservableCounterStore(this);
    this.todoStore = new ObservableTodoStore(this);
  }
}

const store = new RootStore();
injectStores({ store });
export const MobxContext = createContext<RootStore>(store);

export const MobxProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <MobxContext.Provider value={store}>{children}</MobxContext.Provider>;
};
