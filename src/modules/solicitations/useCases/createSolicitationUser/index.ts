import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";

import { CreateSolicitationUserController } from "./CreateSolicitationUserController";
import { CreateSolicitationUserUseCase } from "./CreateSolicitationUserUseCase";

export default (): CreateSolicitationUserController => {
    const solicitationsRepository = new SolicitationsRepository();
    const usersRepository = new UsersRepository();
    const createSolicitationUserUseCase = new CreateSolicitationUserUseCase(
        solicitationsRepository,
        usersRepository
    );

    const createSolicitationUserController =
        new CreateSolicitationUserController(createSolicitationUserUseCase);

    return createSolicitationUserController;
};
