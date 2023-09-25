import { Controller, Get } from '@nestjs/common';
import { TaskDataService } from '../services/task-data.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskDataService: TaskDataService) {}

  @Get()
  getHello(): string {
    return null;
  }
}
