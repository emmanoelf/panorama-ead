import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUpdateCourseDTO } from "@modules/courses/dto/IUpdateCourseDTO";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

import { UpdateCourseUseCaseErrors } from "./UpdateCourseUseCaseErrors";

class UpdateCourseUseCase {
    constructor(
        private coursesRepository: ICoursesRepository,
        private usersRepository: IUsersRepository,
        private schoolsRepository: ISchoolsRepository
    ) {}

    async execute({
        id,
        name,
        user_id,
        school_id,
        user,
        school,
    }: IUpdateCourseDTO): Promise<Course> {
        const course = await this.coursesRepository.findById(id);
        if (!course) {
            throw new UpdateCourseUseCaseErrors.CourseNotFound();
        }

        course.user = await this.usersRepository.findById(user_id);
        if (!course.user) {
            throw new UpdateCourseUseCaseErrors.UserNotFound();
        }

        course.school = await this.schoolsRepository.findById(school_id);
        if (!course.school) {
            throw new UpdateCourseUseCaseErrors.SchoolNotFound();
        }

        await this.coursesRepository.update({
            id,
            name,
            user_id,
            school_id,
            user: course.user,
            school: course.school,
        });

        return course;
    }
}

export { UpdateCourseUseCase };
