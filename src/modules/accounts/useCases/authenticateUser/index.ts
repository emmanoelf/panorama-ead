import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider";

import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export default (): AuthenticateUserController => {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UsersTokensRepository();
    const dateProvider = new DayjsDateProvider();

    const authenticateUserUseCase = new AuthenticateUserUseCase(
        usersRepository,
        usersTokensRepository,
        dateProvider
    );

    const authenticateUserController = new AuthenticateUserController(
        authenticateUserUseCase
    );
    return authenticateUserController;
};
