import { PeriodOffer } from "@modules/solicitations/infra/typeorm/entities/PeriodOffer";
import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";

class ListPeriodOfferUseCase {
    constructor(private periodOffersRepository: IPeriodOffersRepository) {}

    async execute(): Promise<PeriodOffer[]> {
        const list = await this.periodOffersRepository.findAll();
        return list;
    }
}
export { ListPeriodOfferUseCase };
