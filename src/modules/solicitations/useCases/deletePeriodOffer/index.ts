import { PeriodOffersRepository } from "@modules/solicitations/infra/typeorm/repositories/PeriodOffersRepository";

import { DeletePeriodOfferController } from "./DeletePeriodOfferController";
import { DeletePeriodOfferUseCase } from "./DeletePeriodOfferUseCase";

export default (): DeletePeriodOfferController => {
    const periodOffersRepository = new PeriodOffersRepository();
    const deletePeriodOfferUseCase = new DeletePeriodOfferUseCase(
        periodOffersRepository
    );
    const deletePeriodOfferController = new DeletePeriodOfferController(
        deletePeriodOfferUseCase
    );

    return deletePeriodOfferController;
};
