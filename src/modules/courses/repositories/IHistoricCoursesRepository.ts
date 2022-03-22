import { ICreateHistoricCourseDTO } from "../dto/ICreateHistoricCourseDTO";
import { HistoricCourse } from "../infra/typeorm/entities/HistoricCourse";

interface IHistoricCoursesRepository {
    create(data: ICreateHistoricCourseDTO): Promise<HistoricCourse>;
    updateNote(id: string, note: string): Promise<void>;
    findById(id: string): Promise<HistoricCourse>;
    listAll(): Promise<HistoricCourse[]>;
    listByFilter(
        id_course?: string,
        name_course?: string,
        former_coordinator_name?: string,
        former_coordinator_email?: string,
        current_coordinator_name?: string,
        current_coordinator_email?: string
    ): Promise<HistoricCourse[]>;
}

export { IHistoricCoursesRepository };
