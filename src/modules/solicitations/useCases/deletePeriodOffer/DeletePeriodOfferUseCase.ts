import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";

import { DeletePeriodOfferErrors } from "./DeletePeriodOfferErrors";

class DeletePeriodOfferUseCase {
    constructor(private periodOffersRepository: IPeriodOffersRepository) {}

    async execute(id: string): Promise<void> {
        const periodOffer = await this.periodOffersRepository.findById(id);

        if (!periodOffer) {
            throw new DeletePeriodOfferErrors.PeriodOfferNotFound();
        }

        await this.periodOffersRepository.deleteById(id);
    }
}

export { DeletePeriodOfferUseCase };
