import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { AppConfigModule } from './shared/config/app-config.module';

@Module({
  imports: [TaskModule, AppConfigModule],
})
export class AppModule {}
