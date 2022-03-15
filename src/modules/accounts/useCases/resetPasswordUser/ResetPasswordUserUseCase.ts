import { hash } from "bcryptjs";

import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { ResetPasswordUserErrors } from "./ResetPasswordUserErrors";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokensRepository: IUserTokensRepository,
        private dateProvider: IDateProvider
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new ResetPasswordUserErrors.InvalidToken();
        }

        if (
            this.dateProvider.isResetPasswordTimeExpired(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new ResetPasswordUserErrors.ExpiredToken();
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        user.password = await hash(password, 8);

        await this.usersRepository.create(user);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
