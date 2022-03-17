import { School } from "@modules/courses/infra/typeorm/entities/School";
import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

class ListSchoolsUseCase {
    constructor(private schoolsRepository: ISchoolsRepository) {}

    async execute(): Promise<School[]> {
        const schools = await this.schoolsRepository.listAll();
        return schools;
    }
}

export { ListSchoolsUseCase };
