import { SchoolsRepository } from "@modules/courses/infra/typeorm/repositories/SchoolsRepository";

import { DeleteSchoolController } from "./DeleteSchoolController";
import { DeleteSchoolUseCase } from "./DeleteSchoolUseCase";

export default (): DeleteSchoolController => {
    const schoolsRepository = new SchoolsRepository();
    const deleteSchoolUseCase = new DeleteSchoolUseCase(schoolsRepository);
    const deleteSchoolController = new DeleteSchoolController(
        deleteSchoolUseCase
    );

    return deleteSchoolController;
};
