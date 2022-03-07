import { PermissionsRepository } from "../../repositories/PermissionsRepository";
import { CreatePermissionController } from "./CreatePermissionController";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

export default (): CreatePermissionController => {
    const permissionsRepository = new PermissionsRepository();
    const createPermissionUseCase = new CreatePermissionUseCase(
        permissionsRepository
    );
    const createPermissionController = new CreatePermissionController(
        createPermissionUseCase
    );
    return createPermissionController;
};
