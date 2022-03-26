import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { CreateSolicitationController } from "./CreateSolicitationController";
import { CreateSolicitationUseCase } from "./CreateSolicitationUseCase";

export default (): CreateSolicitationController => {
    const solicitationsRepository = new SolicitationsRepository();
    const createSolicitationUseCase = new CreateSolicitationUseCase(
        solicitationsRepository
    );
    const createSolicitationController = new CreateSolicitationController(
        createSolicitationUseCase
    );

    return createSolicitationController;
};
