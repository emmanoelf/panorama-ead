import { ICreateSchoolDTO } from "@modules/courses/dto/ICreateSchoolDTO";
import { School } from "@modules/courses/infra/typeorm/entities/School";
import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

import { CreateSchoolError } from "./CreateSchoolErrors";

class CreateSchoolUseCase {
    constructor(private schoolsRepository: ISchoolsRepository) {}

    async execute({ description }: ICreateSchoolDTO): Promise<School> {
        const descriptionExists =
            await this.schoolsRepository.findByDescription(description);

        if (descriptionExists) {
            throw new CreateSchoolError.SchoolAlreadyExistsError();
        }

        const school = await this.schoolsRepository.create({ description });

        return school;
    }
}

export { CreateSchoolUseCase };
