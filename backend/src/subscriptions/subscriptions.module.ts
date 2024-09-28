import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { Subscription } from './subscription.entity';
import { Course } from '../courses/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Course])],
  providers: [SubscriptionsService],
  controllers: [SubscriptionsController],
})
export class SubscriptionsModule {}
