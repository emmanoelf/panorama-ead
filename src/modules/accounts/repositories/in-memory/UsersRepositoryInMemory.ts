import { ICreateUserDTO } from "@modules/accounts/dto/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        permission_id,
        name,
        email,
        password,
        phone,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            permission_id,
            name,
            email,
            password,
            phone,
        });

        this.users.push(user);

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => user.id === id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => user.email === email);
        return user;
    }

    async findByIds(ids: string[]): Promise<User[]> {
        const listUsers = this.users.filter((user) => ids.includes(user.id));
        return listUsers;
    }
}

export { UsersRepositoryInMemory };
