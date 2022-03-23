import { Router } from "express";

import createCourseController from "@modules/courses/useCases/createCourse";
import listCoursesController from "@modules/courses/useCases/listCourses";
import updateCourseController from "@modules/courses/useCases/updateCourse";

const coursesRoutes = Router();

coursesRoutes.post("/", (request, response) => {
    return createCourseController().handle(request, response);
});

coursesRoutes.get("/", (request, response) => {
    return listCoursesController().handle(request, response);
});

coursesRoutes.put("/:id", (request, response) => {
    return updateCourseController().handle(request, response);
});

export { coursesRoutes };
