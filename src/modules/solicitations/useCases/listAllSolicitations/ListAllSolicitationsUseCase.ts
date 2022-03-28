import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

class ListAllSolicitationsUseCase {
    constructor(private solicitationsRepository: ISolicitationsRepository) {}

    async execute(): Promise<Solicitation[]> {
        const solicitations = await this.solicitationsRepository.listAll();
        return solicitations;
    }
}

export { ListAllSolicitationsUseCase };
