import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { DeleteSolicitationController } from "./DeleteSolicitationController";
import { DeleteSolicitationUseCase } from "./DeleteSolicitationUseCase";

export default (): DeleteSolicitationController => {
    const solicitationsRepository = new SolicitationsRepository();
    const deleteSolicitationUseCase = new DeleteSolicitationUseCase(
        solicitationsRepository
    );
    const deleteSolicitationController = new DeleteSolicitationController(
        deleteSolicitationUseCase
    );

    return deleteSolicitationController;
};
