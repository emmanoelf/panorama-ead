import { Router } from "express";

import { permissionsRoutes } from "./permissions.routes";

const router = Router();

router.use("/permissions", permissionsRoutes);

export { router };
