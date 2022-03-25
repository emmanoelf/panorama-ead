import { PeriodOffersRepository } from "@modules/solicitations/infra/typeorm/repositories/PeriodOffersRepository";

import { UpdatePeriodOfferController } from "./UpdatePeriodOfferController";
import { UpdatePeriodOfferUseCase } from "./UpdatePeriodOfferUseCase";

export default (): UpdatePeriodOfferController => {
    const periodOffersRepository = new PeriodOffersRepository();
    const updatePeriodOfferUseCase = new UpdatePeriodOfferUseCase(
        periodOffersRepository
    );
    const updatePeriodOfferController = new UpdatePeriodOfferController(
        updatePeriodOfferUseCase
    );

    return updatePeriodOfferController;
};
