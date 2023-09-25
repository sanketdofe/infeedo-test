import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostgresService } from '../../../shared/database/postgres/postgres.service';
import {
  CreateNewTaskRequest,
  CreateNewTaskResponse,
} from '../types/create-new-task.type';
import {
  generateTaskId,
  Task,
  TaskStatus,
} from '../../../shared/database/postgres/models/task.model';
import {
  UpdateTaskRequest,
  UpdateTaskResponse,
} from '../types/update-task.type';

@Injectable()
export class TaskDataService {
  constructor(private readonly postgresService: PostgresService) {}

  async createNewTask(
    task: CreateNewTaskRequest,
  ): Promise<CreateNewTaskResponse> {
    const [createdTask] = await this.postgresService.query<Task>(
      `
        INSERT INTO "Task" 
            (id, "name", "uniqueName", "description", "status") 
        VALUES ($1, $2, $3, $4, $5) 
        ON CONFLICT DO NOTHING
        RETURNING *`,
      [
        generateTaskId(),
        task.name,
        task.name.toLowerCase().replace(/\s+/, '-'),
        task.description,
        task.status || TaskStatus.TODO,
      ],
    );

    if (!createdTask) {
      throw new UnprocessableEntityException(
        `Task with same name ${task.name} already exists`,
      );
    }

    return createdTask;
  }

  async updateTask(task: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    if (!task.name && !task.status && !task.description) {
      throw new BadRequestException('No updates Provided');
    }

    const updateTaskQuery = [];
    const updateTaskQueryValues = [];
    if (task.name) {
      updateTaskQuery.push(`"name" = $${updateTaskQueryValues.length + 1}`);
      updateTaskQuery.push(
        `"uniqueName" = $${updateTaskQueryValues.length + 1}`,
      );
      updateTaskQueryValues.push(
        task.name,
        task.name.toLowerCase().replace(/\s+/, '-'),
      );
    }

    if (task.description) {
      updateTaskQuery.push(
        `"description" = $${updateTaskQueryValues.length + 1}`,
      );
      updateTaskQueryValues.push(task.description);
    }

    if (task.status) {
      updateTaskQuery.push(`"status" = $${updateTaskQueryValues.length + 1}`);
      updateTaskQueryValues.push(task.status);
    }

    updateTaskQuery.push(`"dateUpdated" = NOW()`);

    const [updatedTask] = await this.postgresService.query<Task>(
      `
        UPDATE "Task" 
        SET ${updateTaskQuery.join(', ')}
        WHERE id = $${updateTaskQueryValues.length + 1}
      `,
      [...updateTaskQueryValues, task.id],
    );

    if (!updatedTask) {
      throw new NotFoundException(`Task ${task.id} does not exist`);
    }

    return updatedTask;
  }
}
