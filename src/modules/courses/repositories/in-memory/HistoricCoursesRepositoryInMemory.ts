import { ICreateHistoricCourseDTO } from "@modules/courses/dto/ICreateHistoricCourseDTO";
import { HistoricCourse } from "@modules/courses/infra/typeorm/entities/HistoricCourse";

import { IHistoricCoursesRepository } from "../IHistoricCoursesRepository";

class HistoricCoursesRepositoryInMemory implements IHistoricCoursesRepository {
    historicCourses: HistoricCourse[] = [];

    async create({
        id_course,
        name_course,
        former_coordinator_name,
        former_coordinator_email,
        current_coordinator_name,
        current_coordinator_email,
        note,
    }: ICreateHistoricCourseDTO): Promise<HistoricCourse> {
        const historicCourse = new HistoricCourse();
        Object.assign(historicCourse, {
            id_course,
            name_course,
            former_coordinator_name,
            former_coordinator_email,
            current_coordinator_name,
            current_coordinator_email,
            note,
        });

        this.historicCourses.push(historicCourse);
        return historicCourse;
    }

    async updateNote(id: string, note: string): Promise<void> {
        const historicCourse = await this.findById(id);
        Object.assign(historicCourse, {
            id,
            note,
        });
    }

    async findById(id: string): Promise<HistoricCourse> {
        const historicCourse = this.historicCourses.find(
            (historicCourse) => historicCourse.id === id
        );
        return historicCourse;
    }

    async listAll(): Promise<HistoricCourse[]> {
        const { historicCourses } = this;
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
        const allRegisters = this.historicCourses.filter((historicCourse) => {
            if (
                (id_course && historicCourse.id_course === id_course) ||
                (name_course && historicCourse.name_course === name_course) ||
                (former_coordinator_name &&
                    historicCourse.former_coordinator_name ===
                        former_coordinator_name) ||
                (former_coordinator_email &&
                    historicCourse.former_coordinator_email ===
                        former_coordinator_email) ||
                (current_coordinator_name &&
                    historicCourse.current_coordinator_name ===
                        current_coordinator_name) ||
                (current_coordinator_email &&
                    historicCourse.current_coordinator_email ===
                        current_coordinator_email)
            ) {
                return historicCourse;
            }
            return null;
        });
        return allRegisters;
    }
}

export { HistoricCoursesRepositoryInMemory };
