import {
  Task,
  TaskStatus,
} from '../../../shared/database/postgres/models/task.model';

export type CreateNewTaskRequest = Omit<
  Task,
  'id' | 'dateCreated' | 'dateUpdated' | 'status' | 'uniqueName'
> & {
  status?: TaskStatus;
};

export type CreateNewTaskResponse = Task;
