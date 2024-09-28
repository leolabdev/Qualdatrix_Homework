import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async subscribe(@Body('learnerId') learnerId: number, @Body('courseId') courseId: number) {
    return this.subscriptionsService.subscribe(learnerId, courseId);
  }

  @Get(':learnerId')
  async findSubscribedCourses(@Param('learnerId') learnerId: number) {
    return this.subscriptionsService.findSubscribedCourses(learnerId);
  }
}
