import { IPermissionsRepository } from "@modules/accounts/repositories/IPermissionsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUpdateCourseDTO } from "@modules/courses/dto/IUpdateCourseDTO";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IHistoricCoursesRepository } from "@modules/courses/repositories/IHistoricCoursesRepository";
import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

import { UpdateCourseUseCaseErrors } from "./UpdateCourseUseCaseErrors";

class UpdateCourseUseCase {
    constructor(
        private coursesRepository: ICoursesRepository,
        private usersRepository: IUsersRepository,
        private schoolsRepository: ISchoolsRepository,
        private permissionsRepository: IPermissionsRepository,
        private historicCoursesRepository: IHistoricCoursesRepository
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

        const former_coordinator = await this.usersRepository.findById(
            course.user_id
        );
        const former_coordinator_name = former_coordinator.name;
        const former_coordinator_email = former_coordinator.email;

        course.user = await this.usersRepository.findById(user_id);
        if (!course.user) {
            throw new UpdateCourseUseCaseErrors.UserNotFound();
        }

        course.school = await this.schoolsRepository.findById(school_id);
        if (!course.school) {
            throw new UpdateCourseUseCaseErrors.SchoolNotFound();
        }

        const checkPermission = await this.permissionsRepository.findById(
            course.user.permission_id
        );

        if (
            checkPermission.name !== "Professor autor e Coordenador" &&
            checkPermission.name !== "Coordenador"
        ) {
            throw new UpdateCourseUseCaseErrors.UserNotCoordinatorOrProfessorCoordinator();
        }

        await this.coursesRepository.update({
            id,
            name,
            user_id,
            school_id,
            user: course.user,
            school: course.school,
        });

        await this.historicCoursesRepository.create({
            id_course: course.id,
            name_course: name,
            former_coordinator_name,
            former_coordinator_email,
            current_coordinator_name: course.user.name,
            current_coordinator_email: course.user.email,
        });

        return course;
    }
}

export { UpdateCourseUseCase };
