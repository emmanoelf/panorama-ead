import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AuthenticateUserError } from "./AuthenticateUserError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        email: string;
        permission_id: string;
    };
    token: string;
}

class AuthenticateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AuthenticateUserError.EmailOrPasswordIncorrect();
        }

        const comparePassword = await compare(password, user.password);

        if (!comparePassword) {
            throw new AuthenticateUserError.EmailOrPasswordIncorrect();
        }

        const token = sign({}, process.env.SECRET_TOKEN_APP, {
            subject: user.id,
            expiresIn: "1d",
        });

        const returnToken: IResponse = {
            user: {
                email: user.email,
                permission_id: user.permission_id,
            },
            token,
        };

        return returnToken;
    }
}

export { AuthenticateUserUseCase };
