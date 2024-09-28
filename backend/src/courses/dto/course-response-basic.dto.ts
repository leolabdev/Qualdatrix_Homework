import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseBasicDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the course' })
  id: number;

  @ApiProperty({ example: 'Introduction to NestJS', description: 'The title of the course' })
  title: string;

  @ApiProperty({ example: 'Learn the basics of NestJS', description: 'A short description of the course' })
  description: string;

  @ApiProperty({ example: 120, description: 'The duration of the course in minutes' })
  durationMinutes: number;
}
