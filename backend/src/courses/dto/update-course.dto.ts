import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Advanced NestJS', description: 'The updated title of the course', required: false })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Deep dive into NestJS', description: 'The updated description of the course', required: false })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ example: 180, description: 'The updated duration of the course in minutes', required: false, minimum: 1 })
  durationMinutes?: number;
}
