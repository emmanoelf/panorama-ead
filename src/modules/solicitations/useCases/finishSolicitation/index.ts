import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { FinishSolicitationController } from "./FinishSolicitationController";
import { FinishSolicitationUseCase } from "./FinishSolicitationUseCase";

export default (): FinishSolicitationController => {
    const solicitationsRepository = new SolicitationsRepository();
    const finishSolicitationUseCase = new FinishSolicitationUseCase(
        solicitationsRepository
    );
    const finishSolicitationController = new FinishSolicitationController(
        finishSolicitationUseCase
    );

    return finishSolicitationController;
};
