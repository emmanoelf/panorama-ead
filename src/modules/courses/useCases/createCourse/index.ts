import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";

import { CreateCourseController } from "./CreateCourseController";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

export default (): CreateCourseController => {
    const coursesRepository = new CoursesRepository();
    const createCourseUseCase = new CreateCourseUseCase(coursesRepository);
    const createCourseController = new CreateCourseController(
        createCourseUseCase
    );

    return createCourseController;
};
