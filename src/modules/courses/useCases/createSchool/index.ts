import { SchoolsRepository } from "@modules/courses/infra/typeorm/repositories/SchoolsRepository";

import { CreateSchoolController } from "./CreateSchoolController";
import { CreateSchoolUseCase } from "./CreateSchoolUseCase";

export default (): CreateSchoolController => {
    const schoolsRepository = new SchoolsRepository();
    const createSchoolUseCase = new CreateSchoolUseCase(schoolsRepository);
    const createSchoolController = new CreateSchoolController(
        createSchoolUseCase
    );

    return createSchoolController;
};
