import { ICreateSolicitationDTO } from "@modules/solicitations/dto/ICreateSolicitationDTO";
import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { CreateSolicitationErrors } from "./CreateSolicitationErrors";

class CreateSolicitationUseCase {
    constructor(private solicitationsRepository: ISolicitationsRepository) {}

    async execute({
        name,
        description,
        expected_deadline,
        period_offer_id,
        note,
    }: ICreateSolicitationDTO): Promise<Solicitation> {
        const search = await this.solicitationsRepository.findByName(name);

        if (search) {
            throw new CreateSolicitationErrors.SolicitationAlreadyExists();
        }

        const solicitation = await this.solicitationsRepository.create({
            name,
            description,
            expected_deadline,
            period_offer_id,
            note,
        });

        return solicitation;
    }
}

export { CreateSolicitationUseCase };
