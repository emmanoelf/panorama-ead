import { hash } from "bcryptjs";

import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

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
