import { Router } from "express";

import createSchoolController from "@modules/courses/useCases/createSchool";
import listSchoolsController from "@modules/courses/useCases/listSchools";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const schoolsRoutes = Router();

schoolsRoutes.use(ensureAuthenticated);
schoolsRoutes.post("/", (request, response) => {
    return createSchoolController().handle(request, response);
});
schoolsRoutes.get("/", (request, response) => {
    return listSchoolsController().handle(request, response);
});

export { schoolsRoutes };
