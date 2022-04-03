import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";
import { PeriodOffersRepository } from "@modules/solicitations/infra/typeorm/repositories/PeriodOffersRepository";
import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { UpdateSolicitationController } from "./UpdateSolicitationController";
import { UpdateSolicitationUseCase } from "./UpdateSolicitationUseCase";

export default (): UpdateSolicitationController => {
    const solicitationsRepository = new SolicitationsRepository();
    const periodOffersRepository = new PeriodOffersRepository();
    const coursesRepository = new CoursesRepository();
    const updateSolicitationUseCase = new UpdateSolicitationUseCase(
        solicitationsRepository,
        periodOffersRepository,
        coursesRepository
    );

    const updateSolicitationController = new UpdateSolicitationController(
        updateSolicitationUseCase
    );

    return updateSolicitationController;
};
