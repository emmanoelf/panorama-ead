import { HistoricCourse } from "@modules/courses/infra/typeorm/entities/HistoricCourse";
import { IHistoricCoursesRepository } from "@modules/courses/repositories/IHistoricCoursesRepository";

import { ListByFilterHistoricCourseErrors } from "./ListByFilterHistoricCourseErrors";

interface IRequest {
    id_course?: string;
    name_course?: string;
    former_coordinator_name?: string;
    former_coordinator_email?: string;
    current_coordinator_name?: string;
    current_coordinator_email?: string;
}

class ListByFilterHistoricCourseUseCase {
    constructor(private historicCourseRepository: IHistoricCoursesRepository) {}

    async execute({
        id_course,
        name_course,
        former_coordinator_name,
        former_coordinator_email,
        current_coordinator_name,
        current_coordinator_email,
    }: IRequest): Promise<HistoricCourse[]> {
        const historicCourses =
            await this.historicCourseRepository.listByFilter(
                id_course,
                name_course,
                former_coordinator_name,
                former_coordinator_email,
                current_coordinator_name,
                current_coordinator_email
            );

        if (historicCourses.length === 0) {
            throw new ListByFilterHistoricCourseErrors.NotFoundWithTheseParameters();
        }

        return historicCourses;
    }
}
export { ListByFilterHistoricCourseUseCase };
