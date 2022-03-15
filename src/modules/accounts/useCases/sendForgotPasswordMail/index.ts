import { DayjsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "../../../../shared/providers/MailProvider/implementations/EtherealMailProvider";
import { UsersRepository } from "../../repositories/UsersRepository";
import { UsersTokensRepository } from "../../repositories/UsersTokensRepository";
import { SendForgotPasswordMailController } from "./SendForgotPasswordMailController";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

const mailProvider = new EtherealMailProvider();

export default (): SendForgotPasswordMailController => {
    const usersRepository = new UsersRepository();
    const usersTokensRepository = new UsersTokensRepository();
    const dateProvider = new DayjsDateProvider();

    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
        usersRepository,
        usersTokensRepository,
        dateProvider,
        mailProvider
    );

    const sendForgotPasswordMailController =
        new SendForgotPasswordMailController(sendForgotPasswordMailUseCase);

    return sendForgotPasswordMailController;
};
