import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { ListAllSolicitationsController } from "./ListAllSolicitationsController";
import { ListAllSolicitationsUseCase } from "./ListAllSolicitationsUseCase";

export default (): ListAllSolicitationsController => {
    const solicitationsRepository = new SolicitationsRepository();
    const listAllSolicitationsUseCase = new ListAllSolicitationsUseCase(
        solicitationsRepository
    );
    const listAllSolicitationsController = new ListAllSolicitationsController(
        listAllSolicitationsUseCase
    );

    return listAllSolicitationsController;
};
