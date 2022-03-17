import { SchoolsRepository } from "@modules/courses/infra/typeorm/repositories/SchoolsRepository";

import { ListSchoolsController } from "./ListSchoolsController";
import { ListSchoolsUseCase } from "./ListSchoolsUseCase";

export default (): ListSchoolsController => {
    const schoolsRepository = new SchoolsRepository();
    const listSchoolsUseCase = new ListSchoolsUseCase(schoolsRepository);
    const listSchoolsController = new ListSchoolsController(listSchoolsUseCase);

    return listSchoolsController;
};
