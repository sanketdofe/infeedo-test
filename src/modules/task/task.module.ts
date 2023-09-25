import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskDataService } from './services/task-data.service';
import { PostgresModule } from '../../shared/database/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  controllers: [TaskController],
  providers: [TaskDataService],
})
export class TaskModule {}
