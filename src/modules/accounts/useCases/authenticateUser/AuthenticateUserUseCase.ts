import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

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
    refresh_token: string;
}

class AuthenticateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokensRepository: IUserTokensRepository,
        private dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const {
            secret,
            secret_refresh_token,
            refresh_token_expires_days,
            refresh_token_expires_in,
            token_expires_in,
        } = auth;

        if (!user) {
            throw new AuthenticateUserError.EmailOrPasswordIncorrect();
        }

        const comparePassword = await compare(password, user.password);

        if (!comparePassword) {
            throw new AuthenticateUserError.EmailOrPasswordIncorrect();
        }

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: token_expires_in,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: refresh_token_expires_in,
        });

        const expires_date = this.dateProvider.addDays(
            refresh_token_expires_days
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date,
        });

        const returnToken: IResponse = {
            user: {
                email: user.email,
                permission_id: user.permission_id,
            },
            token,
            refresh_token,
        };

        return returnToken;
    }
}

export { AuthenticateUserUseCase };
