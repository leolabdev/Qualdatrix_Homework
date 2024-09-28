import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { DuplicateFieldException } from '../common/exceptions/duplicate-field.exception';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseResponseBasicDto } from './dto/course-response-basic.dto';

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
    const course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['subscriptions'],
    });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<CourseResponseBasicDto> {
    const course = this.coursesRepository.create(createCourseDto);
    try {
      return await this.coursesRepository.save(course);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const pgError = error as any;
        if (pgError.code === '23505') { // PostgreSQL unique violation code
          if (pgError.constraint === 'UQ_COURSE_TITLE') {
            throw new DuplicateFieldException('title', createCourseDto.title);
          }
        }
      }
      throw error;
    }
  }


  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.coursesRepository.preload({
      id,
      ...updateCourseDto,
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    try {
      return await this.coursesRepository.save(course);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const pgError = error as any;
        if (pgError.code === '23505') {
          if (pgError.constraint === 'UQ_COURSE_TITLE') {
            throw new DuplicateFieldException('title', updateCourseDto.title);
          }
        }
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.coursesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
  }

}
