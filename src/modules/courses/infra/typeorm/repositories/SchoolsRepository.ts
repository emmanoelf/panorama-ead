import { getRepository, Repository } from "typeorm";

import { ICreateSchoolDTO } from "@modules/courses/dto/ICreateSchoolDTO";
import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

import { School } from "../entities/School";

class SchoolsRepository implements ISchoolsRepository {
    private repository: Repository<School>;

    constructor() {
        this.repository = getRepository(School);
    }

    async create({ description }: ICreateSchoolDTO): Promise<School> {
        const school = this.repository.create({ description });
        this.repository.save(school);
        return school;
    }

    async findById(id: string): Promise<School> {
        const school = await this.repository.findOne({ id });
        return school;
    }

    async findByDescription(description: string): Promise<School> {
        const school = await this.repository.findOne({ description });
        return school;
    }

    async listAll(): Promise<School[]> {
        const schools = await this.repository.find();
        return schools;
    }

    async update(id: string, newDescription: string): Promise<void> {
        const school = await this.findById(id);
        this.repository.save({
            id: school.id,
            description: newDescription,
            updated_at: new Date(),
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { SchoolsRepository };
