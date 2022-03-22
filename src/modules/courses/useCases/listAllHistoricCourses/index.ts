import { HistoricCoursesRepository } from "@modules/courses/infra/typeorm/repositories/HistoricCoursesRepository";

import { ListAllHistoricCoursesController } from "./ListAllHistoricCoursesController";
import { ListAllHistoricCoursesUseCase } from "./ListAllHistoricCoursesUseCase";

export default (): ListAllHistoricCoursesController => {
    const historicCoursesRepository = new HistoricCoursesRepository();
    const listAllHistoricCoursesUseCase = new ListAllHistoricCoursesUseCase(
        historicCoursesRepository
    );
    const listAllHistoricCoursesController =
        new ListAllHistoricCoursesController(listAllHistoricCoursesUseCase);
    return listAllHistoricCoursesController;
};
