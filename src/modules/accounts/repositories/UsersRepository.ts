import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        permission_id,
        name,
        email,
        password,
        phone,
        ra,
        id,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            permission_id,
            name,
            email,
            password,
            phone,
            ra,
            id,
        });

        await this.repository.save(user);
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }
}

export { UsersRepository };
