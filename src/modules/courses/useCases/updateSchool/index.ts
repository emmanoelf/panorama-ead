import { SchoolsRepository } from "@modules/courses/infra/typeorm/repositories/SchoolsRepository";

import { UpdateSchoolController } from "./UpdateSchoolController";
import { UpdateSchoolUseCase } from "./UpdateSchoolUseCase";

export default (): UpdateSchoolController => {
    const schoolsRepository = new SchoolsRepository();
    const updateSchoolUseCase = new UpdateSchoolUseCase(schoolsRepository);
    const updateSchoolController = new UpdateSchoolController(
        updateSchoolUseCase
    );

    return updateSchoolController;
};
