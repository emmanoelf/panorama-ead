import { PermissionsRepositoryInMemory } from "../../repositories/in-memory/PermissionsRepositoryInMemory";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

const permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
const createPermissionUseCase = new CreatePermissionUseCase(
    permissionsRepositoryInMemory
);

export { createPermissionUseCase };
