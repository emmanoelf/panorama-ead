import { HistoricCoursesRepository } from "@modules/courses/infra/typeorm/repositories/HistoricCoursesRepository";

import { UpdateNoteHistoricCourseController } from "./UpdateNoteHistoricCourseController";
import { UpdateNoteHistoricCourseUseCase } from "./UpdateNoteHistoricCourseUseCase";

export default (): UpdateNoteHistoricCourseController => {
    const historicCoursesRepository = new HistoricCoursesRepository();
    const updateNoteHistoricCourseUseCase = new UpdateNoteHistoricCourseUseCase(
        historicCoursesRepository
    );
    const updateNoteHistoricCourseController =
        new UpdateNoteHistoricCourseController(updateNoteHistoricCourseUseCase);

    return updateNoteHistoricCourseController;
};
