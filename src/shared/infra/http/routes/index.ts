import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { coursesRoutes } from "./courses.routes";
import { historic_courses } from "./historic_courses.routes";
import { passwordRoutes } from "./password.routes";
import { permissionsRoutes } from "./permissions.routes";
import { schoolsRoutes } from "./schools.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/permissions", permissionsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/recovery", passwordRoutes);
router.use("/schools", schoolsRoutes);
router.use("/courses", coursesRoutes);
router.use("/historic_courses", historic_courses);

export { router };
