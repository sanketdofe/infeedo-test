import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { TaskDataService } from '../services/task-data.service';
import { CreateNewTaskDto } from '../dtos/create-new-task.dto';
import { UpdateTaskBodyDto, UpdateTaskParamDto } from '../dtos/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskDataService: TaskDataService) {}

  @Post()
  createNewTask(@Body() body: CreateNewTaskDto) {
    return this.taskDataService.createNewTask(body);
  }

  @Put(':taskId')
  updateTask(
    @Body() body: UpdateTaskBodyDto,
    @Param() { taskId }: UpdateTaskParamDto,
  ) {
    return this.taskDataService.updateTask({ id: taskId, ...body });
  }
}
