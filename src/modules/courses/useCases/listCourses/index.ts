import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";

import { ListCoursesController } from "./ListCoursesController";
import { ListCoursesUseCase } from "./ListCoursesUseCase";

export default (): ListCoursesController => {
    const coursesRepository = new CoursesRepository();
    const listCoursesUseCase = new ListCoursesUseCase(coursesRepository);
    const listCoursesController = new ListCoursesController(listCoursesUseCase);

    return listCoursesController;
};
