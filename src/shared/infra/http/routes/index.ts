import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { passwordRoutes } from "./password.routes";
import { permissionsRoutes } from "./permissions.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/permissions", permissionsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/recovery", passwordRoutes);

export { router };
