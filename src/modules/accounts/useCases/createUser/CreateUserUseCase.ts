import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserErrors } from "./CreateUserErrors";

interface IRequest {
    idPermission: string;
    name: string;
    email: string;
    password: string;
    phone: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        idPermission,
        name,
        email,
        password,
        phone,
    }: IRequest): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new CreateUserErrors.EmailAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            idPermission,
            name,
            email,
            password,
            phone,
        });

        return user;
    }
}

export { CreateUserUseCase };
