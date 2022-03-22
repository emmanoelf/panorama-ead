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

    async updateNote(id: string, note: string): Promise<void> {
        await this.repository.save({ id, note });
    }

    async findById(id: string): Promise<HistoricCourse> {
        const historicCourse = await this.repository.findOne({ id });
        return historicCourse;
    }

    async listAll(): Promise<HistoricCourse[]> {
        const historicCourses = await this.repository.find({
            order: { name_course: "ASC", created_at: "DESC" },
        });
        return historicCourses;
    }

    async listByFilter(
        id_course?: string,
        name_course?: string,
        former_coordinator_name?: string,
        former_coordinator_email?: string,
        current_coordinator_name?: string,
        current_coordinator_email?: string
    ): Promise<HistoricCourse[]> {
        const historicCourse = await this.repository.find({
            order: {
                name_course: "ASC",
                created_at: "DESC",
            },
            where: [
                {
                    id_course,
                },
                {
                    name_course,
                },
                {
                    former_coordinator_name,
                },
                {
                    former_coordinator_email,
                },
                {
                    current_coordinator_name,
                },
                {
                    current_coordinator_email,
                },
            ],
        });
        return historicCourse;
    }
}

export { HistoricCoursesRepository };
