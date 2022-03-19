import { ICreateCourseDTO } from "@modules/courses/dto/ICreateCourseDTO";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

import { CreateCourseErrors } from "./CreateCourseErrors";

class CreateCourseUseCase {
    constructor(private coursesRepository: ICoursesRepository) {}

    async execute({
        id,
        name,
        user_id,
        school_id,
    }: ICreateCourseDTO): Promise<Course> {
        const courseExists = await this.coursesRepository.findByName(name);

        if (courseExists) {
            throw new CreateCourseErrors.CourseAlreadyExists();
        }

        const course = await this.coursesRepository.create({
            id,
            name,
            user_id,
            school_id,
        });

        return course;
    }
}

export { CreateCourseUseCase };
