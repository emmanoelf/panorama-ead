import { Router } from "express";

import { permissionsRoutes } from "./permissions.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/permissions", permissionsRoutes);
router.use("/users", usersRoutes);

export { router };
