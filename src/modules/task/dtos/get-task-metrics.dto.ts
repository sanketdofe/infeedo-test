import { IsEnum, IsOptional } from 'class-validator';
import { MetricsTimePeriod } from '../types/get-task-metrics.type';

export class GetTaskMetricsDto {
  @IsEnum(MetricsTimePeriod, {
    message: `period must be one of ${Object.values(MetricsTimePeriod).join(
      ', ',
    )}`,
  })
  @IsOptional()
  period?: MetricsTimePeriod;
}
