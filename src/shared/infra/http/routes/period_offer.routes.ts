import { Router } from "express";

import createPeriodOfferController from "@modules/solicitations/useCases/createPeriodOffer";
import listPeriodOfferController from "@modules/solicitations/useCases/listPeriodOffer";

const period_offerRoutes = Router();

period_offerRoutes.post("/", (request, response) => {
    return createPeriodOfferController().handle(request, response);
});

period_offerRoutes.get("/", (request, response) => {
    return listPeriodOfferController().handle(request, response);
});

export { period_offerRoutes };
