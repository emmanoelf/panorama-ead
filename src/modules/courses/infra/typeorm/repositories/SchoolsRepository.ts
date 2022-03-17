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
        const school = await this.repository.create({ description });
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
}
export { SchoolsRepository };
