import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };
