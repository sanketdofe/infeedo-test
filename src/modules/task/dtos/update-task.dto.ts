import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../../shared/database/postgres/models/task.model';

export class UpdateTaskBodyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus, {
    message: `status must be one of ${Object.values(TaskStatus).join(', ')}`,
  })
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskParamDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;
}
