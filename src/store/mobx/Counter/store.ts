import { makeAutoObservable } from 'mobx';

export class ObservableCounterStore {
  rootStore: any;
  count: number;

  constructor(rootStore: any) {
    this.rootStore = rootStore;

    this.count = 0;
    makeAutoObservable(this);
  }

  inc() {
    this.count = this.count + 1;
  }

  dec() {
    this.count = this.count - 1;
  }

  reset(val: number) {
    this.count = val;
  }
}
