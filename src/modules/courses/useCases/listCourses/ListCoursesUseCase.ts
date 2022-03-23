import { Course } from "@modules/courses/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

class ListCoursesUseCase {
    constructor(private coursesRepository: ICoursesRepository) {}

    async execute(): Promise<Course[]> {
        const courses = await this.coursesRepository.findAll();
        return courses;
    }
}

export { ListCoursesUseCase };
