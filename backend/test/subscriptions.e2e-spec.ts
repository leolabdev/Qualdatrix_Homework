import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { resetDatabase } from '../test-utils/reset-database';

describe('Subscriptions (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await resetDatabase(app);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/POST subscriptions - should create a new subscription', async () => {
    const createCourseDto = {
      title: 'Introduction to NestJS',
      description: 'Learn the basics of NestJS',
      durationMinutes: 120,
    };

    // Create a new course to subscribe to
    const course = await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    // Create a subscription for learnerId = 1 and the newly created course
    const createSubscriptionDto = {
      learnerId: 1,
      courseId: course.body.id,
    };

    // Send the subscription request and validate the response
    return request(app.getHttpServer())
      .post('/subscriptions')
      .send(createSubscriptionDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.learnerId).toBe(1);
        expect(res.body.course.id).toBe(course.body.id);
      });
  });

  it('/GET subscriptions/:learnerId - should return all subscribed courses for a learner', async () => {
    const createCourseDto = {
      title: 'Introduction to NestJS',
      description: 'Learn the basics of NestJS',
      durationMinutes: 120,
    };

    // Create a new course
    const course = await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    // Create a subscription for learnerId = 1
    const createSubscriptionDto = {
      learnerId: 1,
      courseId: course.body.id,
    };

    await request(app.getHttpServer()).post('/subscriptions').send(createSubscriptionDto).expect(201);

    // Get all subscribed courses for learnerId = 1
    return request(app.getHttpServer())
      .get('/subscriptions/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].id).toBe(course.body.id);
      });
  });

  // Test for unsubscribing a learner from a course
  it('/DELETE subscriptions - should unsubscribe a learner from a course', async () => {
    const createCourseDto = {
      title: 'Introduction to NestJS',
      description: 'Learn the basics of NestJS',
      durationMinutes: 120,
    };

    // Create a new course
    const course = await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    // Create a subscription for learnerId = 1
    const createSubscriptionDto = {
      learnerId: 1,
      courseId: course.body.id,
    };

    await request(app.getHttpServer()).post('/subscriptions').send(createSubscriptionDto).expect(201);

    // Unsubscribe learnerId = 1 from the course
    await request(app.getHttpServer())
      .delete('/subscriptions')
      .send(createSubscriptionDto)
      .expect(200);

    // Check that the learner no longer has any subscriptions
    const subscriptions = await request(app.getHttpServer()).get('/subscriptions/1').expect(200);
    expect(subscriptions.body.length).toBe(0);
  });
});
