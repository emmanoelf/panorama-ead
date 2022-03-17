import { sign, verify } from "jsonwebtoken";

import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/providers/DateProvider/IDateProvider";

import { RefreshTokenError } from "./RefreshTokenError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

class RefreshTokenUseCase {
    constructor(
        private userTokensRepository: IUserTokensRepository,
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<ITokenResponse> {
        const { sub, email } = verify(
            token,
            process.env.REFRESH_SECRET_TOKEN_APP
        ) as IPayload;

        const user_id = sub;

        const userToken =
            await this.userTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new RefreshTokenError.RefreshTokenNotFound();
        }

        await this.userTokensRepository.deleteById(userToken.id);

        const refresh_token = sign(
            { email },
            process.env.REFRESH_SECRET_TOKEN_APP,
            {
                subject: sub,
                expiresIn: auth.refresh_token_expires_in,
            }
        );

        const expires_date = this.dateProvider.addDays(
            auth.refresh_token_expires_days
        );

        await this.userTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, process.env.SECRET_TOKEN_APP, {
            subject: user_id,
            expiresIn: auth.token_expires_in,
        });

        return {
            token: newToken,
            refresh_token,
        };
    }
}
export { RefreshTokenUseCase };
