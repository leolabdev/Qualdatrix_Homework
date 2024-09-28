import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Introduction to NestJS', description: 'The title of the course' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Learn the basics of NestJS', description: 'A short description of the course' })
  description: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ example: 120, description: 'The duration of the course in minutes', minimum: 1 })
  durationMinutes: number;
}
