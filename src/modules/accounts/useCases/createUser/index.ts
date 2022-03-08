import { UsersRepository } from "../../repositories/UsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export default (): CreateUserController => {
    const usersRepository = new UsersRepository();
    const createUsersUseCase = new CreateUserUseCase(usersRepository);
    const createUserController = new CreateUserController(createUsersUseCase);
    return createUserController;
};
