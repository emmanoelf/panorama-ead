import { PeriodOffersRepository } from "@modules/solicitations/infra/typeorm/repositories/PeriodOffersRepository";

import { ListPeriodOfferController } from "./ListPeriodOfferController";
import { ListPeriodOfferUseCase } from "./ListPeriodOfferUseCase";

export default (): ListPeriodOfferController => {
    const periodOffersRepository = new PeriodOffersRepository();
    const listPeriodOfferUseCase = new ListPeriodOfferUseCase(
        periodOffersRepository
    );
    const listPeriodOfferController = new ListPeriodOfferController(
        listPeriodOfferUseCase
    );

    return listPeriodOfferController;
};
