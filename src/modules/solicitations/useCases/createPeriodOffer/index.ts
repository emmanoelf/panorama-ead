import { PeriodOffersRepository } from "@modules/solicitations/infra/typeorm/repositories/PeriodOffersRepository";

import { CreatePeriodOfferController } from "./CreatePeriodOfferController";
import { CreatePeriodOfferUseCase } from "./CreatePeriodOfferUseCase";

export default (): CreatePeriodOfferController => {
    const periodOffersRepository = new PeriodOffersRepository();
    const createPeriodOfferUseCase = new CreatePeriodOfferUseCase(
        periodOffersRepository
    );
    const createPeriodOfferController = new CreatePeriodOfferController(
        createPeriodOfferUseCase
    );

    return createPeriodOfferController;
};
