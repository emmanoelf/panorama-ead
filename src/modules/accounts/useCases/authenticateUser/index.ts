import { UsersRepository } from "../../repositories/UsersRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export default (): AuthenticateUserController => {
    const usersRepository = new UsersRepository();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
        usersRepository
    );
    const authenticateUserController = new AuthenticateUserController(
        authenticateUserUseCase
    );
    return authenticateUserController;
};
