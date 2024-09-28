import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.coursesRepository.findOneBy({id});
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);
    try {
      return await this.coursesRepository.save(course);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // PostgreSQL error code for unique violation is '23505'
        const pgError = error as any;
        if (pgError.detail.includes('title')) {
          throw new ConflictException(`Course with title "${createCourseDto.title}" already exists`);
        }
      }
      throw error;
    }
  }

}
