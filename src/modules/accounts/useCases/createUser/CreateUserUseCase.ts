import { hash } from "bcryptjs";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserErrors } from "./CreateUserErrors";

interface IRequest {
    permission_id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    ra: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        permission_id,
        name,
        email,
        password,
        phone,
        ra,
    }: IRequest): Promise<User> {
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