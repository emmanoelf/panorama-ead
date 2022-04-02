import { resolve } from "path";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";
import { IMailProvider } from "@shared/providers/MailProvider/IMailProvider";

import { CreateSolicitationUserErrors } from "./CreateSolicitationUserErrors";

interface IRequest {
    solicitation_id: string;
    users_id: string[];
}

class CreateSolicitationUserUseCase {
    constructor(
        private solicitationsRepository: ISolicitationsRepository,
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute({
        solicitation_id,
        users_id,
    }: IRequest): Promise<Solicitation> {
        const findSolicitation = await this.solicitationsRepository.findById(
            solicitation_id
        );

        if (!findSolicitation) {
            throw new CreateSolicitationUserErrors.SolicitationNotFound();
        }

        const users = await this.usersRepository.findByIds(users_id);

        if (users.length === 0) {
            throw new CreateSolicitationUserErrors.NoUserHasBeenAllocated();
        }

        findSolicitation.users = users;

        const solicitation = await this.solicitationsRepository.create(
            findSolicitation
        );

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "invite-course.hbs"
        );

        users.forEach((user) => {
            const variables = {
                name: user.name,
                link: `${process.env.SOLICITATION_MAIL_URL}${solicitation.id}`,
                solicitation: solicitation.name,
            };
            this.mailProvider.sendMail(
                user.email,
                "Convite para ministrar curso",
                variables,
                templatePath
            );
        });

        return findSolicitation;
    }
}

export { CreateSolicitationUserUseCase };
