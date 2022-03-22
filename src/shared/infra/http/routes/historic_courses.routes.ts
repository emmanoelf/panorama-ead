import { Router } from "express";

import listAllHistoricCourseController from "@modules/courses/useCases/listAllHistoricCourses";
import listByFilterHistoricCourseController from "@modules/courses/useCases/listByFilterHistoricCourse";
import updateNoteHistoricCourseController from "@modules/courses/useCases/updateNoteHistoricCourse";

const historic_courses = Router();

historic_courses.get("/query?", (request, response) => {
    return listByFilterHistoricCourseController().handle(request, response);
});
historic_courses.get("/", (request, response) => {
    return listAllHistoricCourseController().handle(request, response);
});
historic_courses.put("/update-note/:id", (request, response) => {
    return updateNoteHistoricCourseController().handle(request, response);
});

export { historic_courses };
