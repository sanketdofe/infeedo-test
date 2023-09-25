import { Injectable } from '@nestjs/common';
import { PostgresService } from '../../../shared/database/postgres/postgres.service';
import {
  GetTaskMetricsRequest,
  GetTaskMetricsResponse,
  MetricsTimePeriod,
} from '../types/get-task-metrics.type';

@Injectable()
export class TaskMetricsService {
  constructor(private readonly postgresService: PostgresService) {}

  async getTaskMetricsSegregatedOverTimePeriod({
    period,
  }: GetTaskMetricsRequest): Promise<GetTaskMetricsResponse> {
    let dateFormat = 'DD/MM/YYYY';
    switch (period) {
      case MetricsTimePeriod.DAILY:
        dateFormat = 'DD/MM/YYYY';
        break;
      case MetricsTimePeriod.WEEKLY:
        dateFormat = `WW "Week", YYYY`;
        break;
      case MetricsTimePeriod.MONTHLY:
        dateFormat = 'Month, YYYY';
        break;
      case MetricsTimePeriod.QUARTERLY:
        dateFormat = 'Q "Quarter", YYYY';
        break;
      case MetricsTimePeriod.YEARLY:
        dateFormat = 'YYYY';
        break;
    }

    const metrics = await this.postgresService.query<
      GetTaskMetricsResponse['taskMetrics'][0]['metrics'] & {
        date: string;
      }
    >(
      `
      SELECT 
        TO_CHAR("dateCreated", $1) as "date", 
        COUNT(*) FILTER (WHERE "status" = 'TODO') AS "openTasks",
        COUNT(*) FILTER (WHERE "status" = 'IN_PROGRESS') AS "inProgressTasks",
        COUNT(*) FILTER (WHERE "status" = 'COMPLETED') AS "completedTasks"
      FROM "Task"
      GROUP BY TO_CHAR("dateCreated", $1)
    `,
      [dateFormat],
    );

    return {
      taskMetrics: metrics.map(
        ({ date, openTasks, completedTasks, inProgressTasks }) => ({
          date: date,
          metrics: {
            openTasks,
            inProgressTasks,
            completedTasks,
          },
        }),
      ),
    };
  }
}
