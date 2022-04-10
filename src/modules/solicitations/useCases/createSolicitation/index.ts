import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";
import { ChatsRepository } from "@modules/solicitations/infra/typeorm/repositories/ChatsRepository";
import { PeriodOffersRepository } from "@modules/solicitations/infra/typeorm/repositories/PeriodOffersRepository";
import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { CreateSolicitationController } from "./CreateSolicitationController";
import { CreateSolicitationUseCase } from "./CreateSolicitationUseCase";

export default (): CreateSolicitationController => {
    const solicitationsRepository = new SolicitationsRepository();
    const periodOffersRepository = new PeriodOffersRepository();
    const coursesRepository = new CoursesRepository();
    const chatsRepository = new ChatsRepository();
    const createSolicitationUseCase = new CreateSolicitationUseCase(
        solicitationsRepository,
        periodOffersRepository,
        coursesRepository,
        chatsRepository
    );
    const createSolicitationController = new CreateSolicitationController(
        createSolicitationUseCase
    );

    return createSolicitationController;
};
