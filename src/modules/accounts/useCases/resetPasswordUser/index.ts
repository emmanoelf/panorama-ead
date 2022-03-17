import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider";

import { ResetPasswordUserController } from "./ResetPasswordUserController";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

export default (): ResetPasswordUserController => {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UsersTokensRepository();
    const dateProvider = new DayjsDateProvider();

    const resetPasswordUserUseCase = new ResetPasswordUserUseCase(
        usersRepository,
        usersTokensRepository,
        dateProvider
    );

    const resetPasswordUserController = new ResetPasswordUserController(
        resetPasswordUserUseCase
    );

    return resetPasswordUserController;
};
