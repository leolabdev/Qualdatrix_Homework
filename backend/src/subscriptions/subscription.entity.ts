import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  learnerId: number;

  @ManyToOne(() => Course, course => course.subscriptions, { onDelete: 'CASCADE' })
  course: Course;

  @CreateDateColumn()
  subscribedAt: Date;
}