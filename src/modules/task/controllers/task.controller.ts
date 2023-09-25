import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TaskDataService } from '../services/task-data.service';
import { CreateNewTaskDto } from '../dtos/create-new-task.dto';
import { UpdateTaskBodyDto, UpdateTaskParamDto } from '../dtos/update-task.dto';
import { GetPaginatedTasksQueryDto } from '../dtos/get-paginated-tasks.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskDataService: TaskDataService) {}

  @Get()
  getPaginatedTasks(@Query() query: GetPaginatedTasksQueryDto) {
    return this.taskDataService.getPaginatedTasks({
      ...query,
    });
  }

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
