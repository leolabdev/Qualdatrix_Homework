import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Subscription } from './subscription.entity';
import { Course } from '../courses/course.entity';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Subscription created', type: Subscription })
  @ApiResponse({ status: 409, description: 'User already subscribed to this course' })
  async subscribe(@Body('learnerId') learnerId: number, @Body('courseId') courseId: number) {
    return this.subscriptionsService.subscribe(learnerId, courseId);
  }

  @Get(':learnerId')
  @ApiOperation({ summary: 'Get all subscribed courses for a learner' })
  @ApiResponse({ status: 200, description: 'List of subscribed courses', type: [Course] })
  async findSubscribedCourses(@Param('learnerId') learnerId: number) {
    return this.subscriptionsService.findSubscribedCourses(learnerId);
  }

  @Delete()
  @ApiOperation({ summary: 'Unsubscribe from a course' })
  @ApiResponse({ status: 200, description: 'Unsubscribed successfully' })
  @ApiResponse({ status: 404, description: 'Subscription not found' })
  async unsubscribe(@Body('learnerId') learnerId: number, @Body('courseId') courseId: number): Promise<void> {
    return this.subscriptionsService.unsubscribe(learnerId, courseId);
  }

}
