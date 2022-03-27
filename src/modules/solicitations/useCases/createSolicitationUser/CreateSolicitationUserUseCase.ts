import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { CreateSolicitationUserErrors } from "./CreateSolicitationUserErrors";

interface IRequest {
    solicitation_id: string;
    users_id: string[];
}

class CreateSolicitationUserUseCase {
    constructor(
        private solicitationsRepository: ISolicitationsRepository,
        private usersRepository: UsersRepository
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

        findSolicitation.users = users;

        await this.solicitationsRepository.create(findSolicitation);

        return findSolicitation;
    }
}

export { CreateSolicitationUserUseCase };
