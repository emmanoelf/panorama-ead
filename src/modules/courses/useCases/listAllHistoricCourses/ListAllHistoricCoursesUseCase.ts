import { HistoricCourse } from "@modules/courses/infra/typeorm/entities/HistoricCourse";
import { IHistoricCoursesRepository } from "@modules/courses/repositories/IHistoricCoursesRepository";

class ListAllHistoricCoursesUseCase {
    constructor(
        private historicCoursesRepository: IHistoricCoursesRepository
    ) {}

    async execute(): Promise<HistoricCourse[]> {
        const historicCourses = await this.historicCoursesRepository.listAll();
        return historicCourses;
    }
}

export { ListAllHistoricCoursesUseCase };
