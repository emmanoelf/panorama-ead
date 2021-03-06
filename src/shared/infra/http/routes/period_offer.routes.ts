import { Router } from "express";

import createPeriodOfferController from "@modules/solicitations/useCases/createPeriodOffer";
import deletePeriodOfferController from "@modules/solicitations/useCases/deletePeriodOffer";
import listPeriodOfferController from "@modules/solicitations/useCases/listPeriodOffer";
import updatePeriodOfferController from "@modules/solicitations/useCases/updatePeriodOffer";

const period_offerRoutes = Router();

period_offerRoutes.post("/", (request, response) => {
    return createPeriodOfferController().handle(request, response);
});

period_offerRoutes.get("/", (request, response) => {
    return listPeriodOfferController().handle(request, response);
});

period_offerRoutes.delete("/delete/:id", (request, response) => {
    return deletePeriodOfferController().handle(request, response);
});

period_offerRoutes.put("/update/:id", (request, response) => {
    return updatePeriodOfferController().handle(request, response);
});

export { period_offerRoutes };
