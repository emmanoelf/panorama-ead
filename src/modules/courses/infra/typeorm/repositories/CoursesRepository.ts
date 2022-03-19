import { getRepository, Repository } from "typeorm";

import { ICreateCourseDTO } from "@modules/courses/dto/ICreateCourseDTO";
import { IUpdateCourseDTO } from "@modules/courses/dto/IUpdateCourseDTO";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

import { Course } from "../entities/Course";

class CoursesRepository implements ICoursesRepository {
    private repository: Repository<Course>;

    constructor() {
        this.repository = getRepository(Course);
    }

    async create({
        id,
        name,
        user_id,
        school_id,
    }: ICreateCourseDTO): Promise<Course> {
        const course = this.repository.create({
            id,
            name,
            user_id,
            school_id,
        });
        this.repository.save(course);
        return course;
    }

    async findById(id: string): Promise<Course> {
        const course = await this.repository.findOne({ id });
        return course;
    }

    async findByName(name: string): Promise<Course> {
        const course = await this.repository.findOne({ name });
        return course;
    }

    async update({
        id,
        name,
        school_id,
        user_id,
        user,
        school,
    }: IUpdateCourseDTO): Promise<Course> {
        const update = await this.repository.save({
            id,
            name,
            school_id,
            user_id,
            user,
            school,
            updated_at: new Date(),
        });

        return update;
    }
}

export { CoursesRepository };
