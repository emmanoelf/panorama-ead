import { hash } from "bcryptjs";

import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserErrors } from "./CreateUserErrors";

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        permission_id,
        name,
        email,
        password,
        phone,
        ra,
    }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new CreateUserErrors.EmailAlreadyExistsError();
        }

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            permission_id,
            name,
            email,
            password: passwordHash,
            phone,
            ra,
        });

        return user;
    }
}

export { CreateUserUseCase };
