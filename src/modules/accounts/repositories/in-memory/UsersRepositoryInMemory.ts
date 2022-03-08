import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { User } from "../../entities/User";
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
}

export { UsersRepositoryInMemory };
