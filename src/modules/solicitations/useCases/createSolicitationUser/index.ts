import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { SolicitationsRepository } from "@modules/solicitations/infra/typeorm/repositories/SolicitationsRepository";
import { EtherealMailProvider } from "@shared/providers/MailProvider/implementations/EtherealMailProvider";
import { SendGridMailProvider } from "@shared/providers/MailProvider/implementations/SendGridMailProvider";

import { CreateSolicitationUserController } from "./CreateSolicitationUserController";
import { CreateSolicitationUserUseCase } from "./CreateSolicitationUserUseCase";

const mailProvider = new EtherealMailProvider();
const sendGridMailProvider = new SendGridMailProvider();

export default (): CreateSolicitationUserController => {
    const solicitationsRepository = new SolicitationsRepository();
    const usersRepository = new UsersRepository();
    const createSolicitationUserUseCase = new CreateSolicitationUserUseCase(
        solicitationsRepository,
        usersRepository,
        sendGridMailProvider
    );

    const createSolicitationUserController =
        new CreateSolicitationUserController(createSolicitationUserUseCase);

    return createSolicitationUserController;
};
