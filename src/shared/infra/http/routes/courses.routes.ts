import { Router } from "express";

import createCourseController from "@modules/courses/useCases/createCourse";
import updateCourseController from "@modules/courses/useCases/updateCourse";

const coursesRoutes = Router();

coursesRoutes.post("/", (request, response) => {
    return createCourseController().handle(request, response);
});

coursesRoutes.put("/:id", (request, response) => {
    return updateCourseController().handle(request, response);
});

export { coursesRoutes };
