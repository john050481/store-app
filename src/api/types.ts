export enum ProcessEnum {
  INITIAL = 'initial',
  REQUESTED = 'requested',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export type TTask = {
  id: string;
  task: string;
  completed: boolean;
};
