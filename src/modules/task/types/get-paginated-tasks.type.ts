import { Task } from '../../../shared/database/postgres/models/task.model';

type PaginationParams = { lastTaskId: string; lastTaskDateCreated: Date };

export type GetPaginatedTasksRequest = Partial<PaginationParams> & {
  limit?: number;
};

export type GetPaginatedTasksResponse = {
  tasks: Array<Omit<Task, 'uniqueName'>>;
  paginationParams: PaginationParams & {
    hasMore: boolean;
  };
};
