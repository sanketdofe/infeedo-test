import { IsDate, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetPaginatedTasksQueryDto {
  @IsString()
  @IsOptional()
  lastTaskId?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  lastDateCreated?: string;
}
