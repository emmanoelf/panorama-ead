import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { DeleteSolicitationErrors } from "./DeleteSolicitationErrors";

class DeleteSolicitationUseCase {
    constructor(private solicitationsRepository: ISolicitationsRepository) {}

    async execute(id: string): Promise<void> {
        const solicitation = await this.solicitationsRepository.findById(id);
        if (!solicitation) {
            throw new DeleteSolicitationErrors.SolicitationNotFound();
        }

        await this.solicitationsRepository.deleteById(id);
    }
}

export { DeleteSolicitationUseCase };
