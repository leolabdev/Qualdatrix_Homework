import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Subscription } from '../subscriptions/subscription.entity';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Represents a Course entity in the database.
 *
 * The `@Entity()` decorator marks this class as a database entity corresponding to the `course` table.
 *
 * The `@Unique()` decorator explicitly defines a unique constraint on the `title` field.
 * This allows for precise error handling by checking against the constraint name during database operations.
 *
 * **Example of Handling Unique Constraint Violations:**
 * ```typescript
 * if (pgError.code === '23505') { // PostgreSQL unique violation code
 *   if (pgError.constraint === 'UQ_COURSE_TITLE') {
 *     throw new DuplicateFieldException('title', createCourseDto.title);
 *   }
 * }
 * ```
 */
@Entity()
@Unique('UQ_COURSE_TITLE', ['title'])
export class Course {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the course' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Introduction to NestJS', description: 'The title of the course' })
  title: string;

  @Column('text')
  @ApiProperty({ example: 'Learn the basics of NestJS', description: 'A short description of the course' })
  description: string;

  @Column()
  @ApiProperty({ example: 120, description: 'The duration of the course in minutes' })
  durationMinutes: number;

  @OneToMany(() => Subscription, subscription => subscription.course)
  @ApiProperty({ type: () => [Subscription], description: 'List of subscriptions for this course' })
  subscriptions: Subscription[];
}
