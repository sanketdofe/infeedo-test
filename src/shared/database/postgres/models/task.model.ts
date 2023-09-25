import { BaseModel } from './base.model';
import { generateRandomString } from '../../../utils/random';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type Task = BaseModel & {
  id: string;
  name: string;
  uniqueName: string;
  description: string;
  status: TaskStatus;
};

export const generateTaskId = () => `task_${generateRandomString(10)}`;
