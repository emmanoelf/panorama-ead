import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { DayjsDateProvider } from "@shared/providers/DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "@shared/providers/MailProvider/implementations/EtherealMailProvider";
import { SendGridMailProvider } from "@shared/providers/MailProvider/implementations/SendGridMailProvider";

import { SendForgotPasswordMailController } from "./SendForgotPasswordMailController";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

const mailProvider = new EtherealMailProvider();
const sendGridMailProvider = new SendGridMailProvider();

export default (): SendForgotPasswordMailController => {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UsersTokensRepository();
    const dateProvider = new DayjsDateProvider();

    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
        usersRepository,
        usersTokensRepository,
        dateProvider,
        sendGridMailProvider
    );

    const sendForgotPasswordMailController =
        new SendForgotPasswordMailController(sendForgotPasswordMailUseCase);

    return sendForgotPasswordMailController;
};
