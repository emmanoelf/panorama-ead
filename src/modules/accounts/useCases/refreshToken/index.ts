import { DayjsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepository } from "../../repositories/UsersTokensRepository";
import { RefreshTokenController } from "./RefreshTokenController";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export default (): RefreshTokenController => {
    const usersTokensRepository = new UsersTokensRepository();
    const dateProvider = new DayjsDateProvider();

    const refreshTokenUseCase = new RefreshTokenUseCase(
        usersTokensRepository,
        dateProvider
    );

    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase
    );

    return refreshTokenController;
};
