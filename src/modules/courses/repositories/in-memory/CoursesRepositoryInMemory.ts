import { ICreateCourseDTO } from "@modules/courses/dto/ICreateCourseDTO";
import { IUpdateCourseDTO } from "@modules/courses/dto/IUpdateCourseDTO";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";

import { ICoursesRepository } from "../ICoursesRepository";

class CoursesRepositoryInMemory implements ICoursesRepository {
    courses: Course[] = [];

    async create({
        id,
        name,
        school_id,
        user_id,
    }: ICreateCourseDTO): Promise<Course> {
        const course = new Course();
        Object.assign(course, {
            id,
            name,
            school_id,
            user_id,
        });

        this.courses.push(course);
        return course;
    }

    async findAll(): Promise<Course[]> {
        const { courses } = this;
        return courses;
    }

    async findById(id: string): Promise<Course> {
        const course = this.courses.find((course) => course.id === id);
        return course;
    }

    async findByName(name: string): Promise<Course> {
        const course = this.courses.find((course) => course.name === name);
        return course;
    }

    async update({
        id,
        name,
        school_id,
        school,
        user,
        user_id,
    }: IUpdateCourseDTO): Promise<Course> {
        const course = await this.findById(id);
        Object.assign(course, {
            id,
            name,
            school_id,
            school,
            user,
            user_id,
            updated_at: new Date(),
        });

        return course;
    }
}

export { CoursesRepositoryInMemory };
