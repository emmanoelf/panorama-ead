import { ICreateSchoolDTO } from "@modules/courses/dto/ICreateSchoolDTO";
import { School } from "@modules/courses/infra/typeorm/entities/School";

import { ISchoolsRepository } from "../ISchoolsRepository";

class SchoolsRepositoryInMemory implements ISchoolsRepository {
    schools: School[] = [];

    async create({ description }: ICreateSchoolDTO): Promise<School> {
        const school = new School();
        Object.assign(school, {
            description,
        });
        this.schools.push(school);

        return school;
    }

    async findById(id: string): Promise<School> {
        const school = this.schools.find((school) => school.id === id);
        return school;
    }

    async findByDescription(description: string): Promise<School> {
        const school = this.schools.find(
            (school) => school.description === description
        );
        return school;
    }

    async listAll(): Promise<School[]> {
        const { schools } = this;
        return schools;
    }

    async update(id: string, newDescription: string): Promise<void> {
        const school = await this.findById(id);
        Object.assign(school, {
            id: school.id,
            description: newDescription,
            updated_at: new Date(),
        });
    }

    async deleteById(id: string): Promise<void> {
        const school = this.schools.find((school) => school.id === id);
        this.schools.splice(this.schools.indexOf(school));
    }
}

export { SchoolsRepositoryInMemory };
