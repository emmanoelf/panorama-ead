import { ICreateHistoricCourseDTO } from "../dto/ICreateHistoricCourseDTO";
import { HistoricCourse } from "../infra/typeorm/entities/HistoricCourse";

interface IHistoricCoursesRepository {
    create(data: ICreateHistoricCourseDTO): Promise<HistoricCourse>;
}

export { IHistoricCoursesRepository };
