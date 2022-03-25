import { IUpdatePeriodOfferDTO } from "@modules/solicitations/dto/IUpdatePeriodOfferDTO";
import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";

import { UpdatePeriodOfferErrors } from "./UpdatePeriodOfferErrors";

class UpdatePeriodOfferUseCase {
    constructor(private periodOffersRepository: IPeriodOffersRepository) {}

    async execute({
        id,
        name,
        description,
    }: IUpdatePeriodOfferDTO): Promise<void> {
        const findOffer = await this.periodOffersRepository.findById(id);

        if (!findOffer) {
            throw new UpdatePeriodOfferErrors.PeriodOfferNotFound();
        }

        const findByName = await this.periodOffersRepository.findByName(name);

        if (findByName) {
            throw new UpdatePeriodOfferErrors.PeriodOfferAlreadyExists();
        }

        await this.periodOffersRepository.update({ id, name, description });
    }
}

export { UpdatePeriodOfferUseCase };
