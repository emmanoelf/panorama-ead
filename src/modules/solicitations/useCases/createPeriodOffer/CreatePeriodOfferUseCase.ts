import { ICreatePeriodOfferDTO } from "@modules/solicitations/dto/ICreatePeriodOfferDTO";
import { PeriodOffer } from "@modules/solicitations/infra/typeorm/entities/PeriodOffer";
import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";

import { CreatePeriodOfferErrors } from "./CreatePeriodOfferErrors";

class CreatePeriodOfferUseCase {
    constructor(private periodOffersRepository: IPeriodOffersRepository) {}

    async execute({
        name,
        description,
    }: ICreatePeriodOfferDTO): Promise<PeriodOffer> {
        const searchPeriodOffer = await this.periodOffersRepository.findByName(
            name
        );

        if (searchPeriodOffer) {
            throw new CreatePeriodOfferErrors.PeriodOfferAlreadyExists();
        }

        const periodOffer = await this.periodOffersRepository.create({
            name,
            description,
        });

        return periodOffer;
    }
}

export { CreatePeriodOfferUseCase };
