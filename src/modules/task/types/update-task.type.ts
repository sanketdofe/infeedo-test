import { Task } from '../../../shared/database/postgres/models/task.model';

export type UpdateTaskRequest = Partial<
  Omit<Task, 'dateCreated' | 'dateUpdated' | 'uniqueName'>
> & {
  id: string;
};

export type UpdateTaskResponse = Task;
