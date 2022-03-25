import { Router } from "express";

import createPeriodOfferController from "@modules/solicitations/useCases/createPeriodOffer";

const period_offerRoutes = Router();

period_offerRoutes.post("/", (request, response) => {
    return createPeriodOfferController().handle(request, response);
});

export { period_offerRoutes };
