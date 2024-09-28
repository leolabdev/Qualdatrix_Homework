import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Course } from '../courses/course.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the subscription' })
  id: number;

  @Column()
  @ApiProperty({ example: 1, description: 'The ID of the learner subscribing to the course' })
  learnerId: number;

  @ManyToOne(() => Course, course => course.subscriptions, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Course, description: 'The course associated with this subscription' })
  course: Course;

  @CreateDateColumn()
  @ApiProperty({ example: '2024-09-28T12:00:00.000Z', description: 'The date when the learner subscribed to the course' })
  subscribedAt: Date;
}
