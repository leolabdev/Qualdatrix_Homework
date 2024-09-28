import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

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
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  durationMinutes: number;
}
