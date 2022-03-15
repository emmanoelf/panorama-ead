import { DayjsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersTokensRepository } from "../../repositories/UsersTokensRepository";
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
