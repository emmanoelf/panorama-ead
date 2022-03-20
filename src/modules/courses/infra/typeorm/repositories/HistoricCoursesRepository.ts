import { getRepository, Repository } from "typeorm";

import { ICreateHistoricCourseDTO } from "@modules/courses/dto/ICreateHistoricCourseDTO";
import { IHistoricCoursesRepository } from "@modules/courses/repositories/IHistoricCoursesRepository";

import { HistoricCourse } from "../entities/HistoricCourse";

class HistoricCoursesRepository implements IHistoricCoursesRepository {
    private repository: Repository<HistoricCourse>;

    constructor() {
        this.repository = getRepository(HistoricCourse);
    }

    async create({
        id,
        id_course,
        name_course,
        former_coordinator_name,
        former_coordinator_email,
        current_coordinator_name,
        current_coordinator_email,
        note,
    }: ICreateHistoricCourseDTO): Promise<HistoricCourse> {
        const historicCourse = this.repository.create({
            id,
            id_course,
            name_course,
            former_coordinator_name,
            former_coordinator_email,
            current_coordinator_name,
            current_coordinator_email,
            note,
        });
        this.repository.save(historicCourse);
        return historicCourse;
    }
}

export { HistoricCoursesRepository };
