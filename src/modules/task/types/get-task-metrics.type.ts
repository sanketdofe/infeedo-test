export enum MetricsTimePeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export type GetTaskMetricsRequest = {
  period: MetricsTimePeriod;
};

export type GetTaskMetricsResponse = {
  taskMetrics: Array<{
    date: string;
    metrics: {
      openTasks: number;
      inProgressTasks: number;
      completedTasks: number;
    };
  }>;
};
