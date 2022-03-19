import { ICreateCourseDTO } from "../dto/ICreateCourseDTO";
import { IUpdateCourseDTO } from "../dto/IUpdateCourseDTO";
import { Course } from "../infra/typeorm/entities/Course";

interface ICoursesRepository {
    create(data: ICreateCourseDTO): Promise<Course>;
    findById(id: string): Promise<Course>;
    findByName(name: string): Promise<Course>;
    update(data: IUpdateCourseDTO): Promise<Course>;
}

export { ICoursesRepository };
