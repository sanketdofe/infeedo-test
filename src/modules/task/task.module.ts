import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskDataService } from './services/task-data.service';
import { PostgresModule } from '../../shared/database/postgres/postgres.module';
import { TaskMetricsService } from './services/task-metrics.service';

@Module({
  imports: [PostgresModule],
  controllers: [TaskController],
  providers: [TaskDataService, TaskMetricsService],
})
export class TaskModule {}
