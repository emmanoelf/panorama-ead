import { ICreateSchoolDTO } from "@modules/courses/dto/ICreateSchoolDTO";
import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

import { CreateSchoolError } from "../createSchool/CreateSchoolErrors";
import { UpdateSchoolErrors } from "./UpdateSchoolErrors";

class UpdateSchoolUseCase {
    constructor(private schoolsRepository: ISchoolsRepository) {}

    async execute({ id, description }: ICreateSchoolDTO): Promise<void> {
        const school = await this.schoolsRepository.findById(id);

        if (!school) {
            throw new UpdateSchoolErrors.SchoolNotFound();
        }

        const descriptionAlreadyExists =
            await this.schoolsRepository.findByDescription(description);

        if (descriptionAlreadyExists) {
            throw new CreateSchoolError.SchoolAlreadyExistsError();
        }

        await this.schoolsRepository.update(id, description);
    }
}

export { UpdateSchoolUseCase };
