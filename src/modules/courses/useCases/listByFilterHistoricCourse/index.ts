import { HistoricCoursesRepository } from "@modules/courses/infra/typeorm/repositories/HistoricCoursesRepository";

import { ListByFilterHistoricCourseController } from "./ListByFilterHistoricCourseController";
import { ListByFilterHistoricCourseUseCase } from "./ListByFilterHistoricCourseUseCase";

export default (): ListByFilterHistoricCourseController => {
    const historicCoursesRepository = new HistoricCoursesRepository();
    const listByFilterHistoricCourseUseCase =
        new ListByFilterHistoricCourseUseCase(historicCoursesRepository);
    const listByFilterHistoricCourseController =
        new ListByFilterHistoricCourseController(
            listByFilterHistoricCourseUseCase
        );
    return listByFilterHistoricCourseController;
};
