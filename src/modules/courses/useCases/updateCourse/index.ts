import { PermissionsRepository } from "@modules/accounts/infra/typeorm/repositories/PermissionsRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";
import { HistoricCoursesRepository } from "@modules/courses/infra/typeorm/repositories/HistoricCoursesRepository";
import { SchoolsRepository } from "@modules/courses/infra/typeorm/repositories/SchoolsRepository";

import { UpdateCourseController } from "./UpdateCourseController";
import { UpdateCourseUseCase } from "./UpdateCourseUseCase";

export default (): UpdateCourseController => {
    const coursesRepository = new CoursesRepository();
    const usersRepository = new UsersRepository();
    const schoolsRepository = new SchoolsRepository();
    const permissionsRepository = new PermissionsRepository();
    const historicCoursesRepository = new HistoricCoursesRepository();
    const updateCourseUseCase = new UpdateCourseUseCase(
        coursesRepository,
        usersRepository,
        schoolsRepository,
        permissionsRepository,
        historicCoursesRepository
    );
    const updateCourseController = new UpdateCourseController(
        updateCourseUseCase
    );

    return updateCourseController;
};
