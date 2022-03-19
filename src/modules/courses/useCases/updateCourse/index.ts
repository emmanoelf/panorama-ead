import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";
import { SchoolsRepository } from "@modules/courses/infra/typeorm/repositories/SchoolsRepository";

import { UpdateCourseController } from "./UpdateCourseController";
import { UpdateCourseUseCase } from "./UpdateCourseUseCase";

export default (): UpdateCourseController => {
    const coursesRepository = new CoursesRepository();
    const usersRepository = new UsersRepository();
    const schoolsRepository = new SchoolsRepository();
    const updateCourseUseCase = new UpdateCourseUseCase(
        coursesRepository,
        usersRepository,
        schoolsRepository
    );
    const updateCourseController = new UpdateCourseController(
        updateCourseUseCase
    );

    return updateCourseController;
};
