import { Router } from "express";

import createSchoolController from "@modules/courses/useCases/createSchool";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const schoolsRoutes = Router();

schoolsRoutes.use(ensureAuthenticated);
schoolsRoutes.post("/", (request, response) => {
    return createSchoolController().handle(request, response);
});

export { schoolsRoutes };
