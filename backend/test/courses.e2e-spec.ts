import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { resetDatabase } from '../test-utils/reset-database';

describe('Courses (e2e)', () => {
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
    await app.close();
  });

  it('/POST courses - should create a new course', async () => {
    const createCourseDto = {
      title: 'Introduction to E2E Testing',
      description: 'Learn how to write end-to-end tests',
      durationMinutes: 90,
    };

    return request(app.getHttpServer())
      .post('/courses')
      .send(createCourseDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toEqual(createCourseDto.title);
        expect(res.body.description).toEqual(createCourseDto.description);
        expect(res.body.durationMinutes).toEqual(createCourseDto.durationMinutes);
        expect(res.body.subscriptions).toBeUndefined(); // Проверка на отсутствие подписок
      });
  });

  it('/GET courses - should return all courses', async () => {
    const createCourseDto = {
      title: 'Introduction to E2E Testing',
      description: 'Learn how to write end-to-end tests',
      durationMinutes: 90,
    };

    await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    return request(app.getHttpServer())
      .get('/courses')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toEqual(createCourseDto.title);
        expect(res.body[0].description).toEqual(createCourseDto.description);
        expect(res.body[0].durationMinutes).toEqual(createCourseDto.durationMinutes);
      });
  });

  it('/GET courses/:id - should return a course by ID', async () => {
    const createCourseDto = {
      title: 'Introduction to E2E Testing',
      description: 'Learn how to write end-to-end tests',
      durationMinutes: 90,
    };

    const course = await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    return request(app.getHttpServer())
      .get(`/courses/${course.body.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toEqual(createCourseDto.title);
        expect(res.body.description).toEqual(createCourseDto.description);
        expect(res.body.durationMinutes).toEqual(createCourseDto.durationMinutes);
      });
  });

  it('/PATCH courses/:id - should update a course', async () => {
    const createCourseDto = {
      title: 'Introduction to E2E Testing',
      description: 'Learn how to write end-to-end tests',
      durationMinutes: 90,
    };

    const course = await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    const updateCourseDto = {
      title: 'Updated Course Title',
      description: 'Updated description',
      durationMinutes: 120,
    };

    return request(app.getHttpServer())
      .patch(`/courses/${course.body.id}`)
      .send(updateCourseDto)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toEqual(updateCourseDto.title);
        expect(res.body.description).toEqual(updateCourseDto.description);
        expect(res.body.durationMinutes).toEqual(updateCourseDto.durationMinutes);
      });
  });

  it('/DELETE courses/:id - should delete course and its subscriptions', async () => {
    const createCourseDto = {
      title: 'Introduction to E2E Testing',
      description: 'Learn how to write end-to-end tests',
      durationMinutes: 90,
    };

    // Create a new course
    const course = await request(app.getHttpServer()).post('/courses').send(createCourseDto).expect(201);

    // Create a subscription for the created course (learnerId = 1)
    const createSubscriptionDto = {
      learnerId: 1,
      courseId: course.body.id, // Use the created course ID for subscription
    };

    await request(app.getHttpServer()).post('/subscriptions').send(createSubscriptionDto).expect(201);

    // Check that the subscription was successfully created for learnerId = 1
    const subscriptions = await request(app.getHttpServer()).get('/subscriptions/1').expect(200);
    expect(subscriptions.body.length).toBe(1); // Expect one subscription
    expect(subscriptions.body[0].id).toBe(course.body.id); // Expect the subscription to be linked to the created course

    // Delete the course
    await request(app.getHttpServer())
      .delete(`/courses/${course.body.id}`)
      .expect(200);

    // Check that the course is deleted (should return 404)
    await request(app.getHttpServer())
      .get(`/courses/${course.body.id}`)
      .expect(404);

    // Check that all subscriptions for learnerId = 1 are deleted (expect 0 subscriptions)
    const subscriptionsAfterDelete = await request(app.getHttpServer()).get('/subscriptions/1').expect(200);
    expect(subscriptionsAfterDelete.body.length).toBe(0); // No more subscriptions
  });

});
