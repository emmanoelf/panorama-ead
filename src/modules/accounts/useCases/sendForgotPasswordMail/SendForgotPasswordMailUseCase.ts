import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/providers/MailProvider/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { SendForgotPasswordMail } from "./SendForgotPasswordMailErrors";

class SendForgotPasswordMailUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private usersTokensRepository: IUserTokensRepository,
        private dateProvider: IDateProvider,
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new SendForgotPasswordMail.UnregisteredUser();
        }

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        const token = uuidV4();
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: this.dateProvider.addHours(3),
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            "Redefinição de senha",
            variables,
            templatePath
        );
    }
}
export { SendForgotPasswordMailUseCase };
