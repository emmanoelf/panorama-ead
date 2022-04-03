import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { FinishSolicitationErrors } from "./FinishSolicitationErrors";

class FinishSolicitationUseCase {
    constructor(private solicitationsRepository: ISolicitationsRepository) {}

    async execute(id: string): Promise<void> {
        const solicitation =
            await this.solicitationsRepository.listOneSolicitationUsers(id);
        if (!solicitation) {
            throw new FinishSolicitationErrors.SolicitationNotFound();
        }

        if (solicitation.users.length === 0) {
            throw new FinishSolicitationErrors.NoUserHasBeenAllocated();
        }

        await this.solicitationsRepository.isFinished(id);
    }
}

export { FinishSolicitationUseCase };
