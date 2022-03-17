import { ISchoolsRepository } from "@modules/courses/repositories/ISchoolsRepository";

import { DeleteSchoolErrors } from "./DeleteSchoolErrors";

class DeleteSchoolUseCase {
    constructor(private schoolsRepository: ISchoolsRepository) {}

    async execute(id: string): Promise<void> {
        const school = await this.schoolsRepository.findById(id);
        if (!school) {
            throw new DeleteSchoolErrors.SchoolNotFound();
        }

        await this.schoolsRepository.deleteById(id);
    }
}

export { DeleteSchoolUseCase };
