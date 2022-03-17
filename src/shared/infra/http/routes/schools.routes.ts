import { Router } from "express";

import createSchoolController from "@modules/courses/useCases/createSchool";
import deleteSchoolController from "@modules/courses/useCases/deleteSchool";
import listSchoolsController from "@modules/courses/useCases/listSchools";
import updateSchoolController from "@modules/courses/useCases/updateSchool";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const schoolsRoutes = Router();

schoolsRoutes.use(ensureAuthenticated);
schoolsRoutes.post("/", (request, response) => {
    return createSchoolController().handle(request, response);
});
schoolsRoutes.get("/", (request, response) => {
    return listSchoolsController().handle(request, response);
});
schoolsRoutes.patch("/update/:id", (request, response) => {
    return updateSchoolController().handle(request, response);
});
schoolsRoutes.delete("/delete/:id", (request, response) => {
    return deleteSchoolController().handle(request, response);
});

export { schoolsRoutes };
