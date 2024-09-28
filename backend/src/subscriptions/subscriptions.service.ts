import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Course } from '../courses/course.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async subscribe(learnerId: number, courseId: number): Promise<Subscription> {
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { learnerId, course: { id: courseId } },
    });

    if (existingSubscription) {
      throw new ConflictException(`Learner with ID ${learnerId} is already subscribed to course with ID ${courseId}`);
    }

    const subscription = this.subscriptionsRepository.create({ learnerId, course });
    return this.subscriptionsRepository.save(subscription);
  }

  async findSubscribedCourses(learnerId: number): Promise<Course[]> {
    const subscriptions = await this.subscriptionsRepository.find({
      where: { learnerId },
      relations: ['course'],
    });
    return subscriptions.map(subscription => subscription.course);
  }

  async unsubscribe(learnerId: number, courseId: number): Promise<void> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { learnerId, course: { id: courseId } },
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription for learner with ID ${learnerId} and course ID ${courseId} not found`);
    }
    await this.subscriptionsRepository.delete(subscription.id);
  }


}
