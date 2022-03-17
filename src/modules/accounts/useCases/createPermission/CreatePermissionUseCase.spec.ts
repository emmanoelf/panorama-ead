import { PermissionsRepositoryInMemory } from "@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory";

import { CreatePermissionError } from "./CreatePermissionError";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
let createPermissionUseCase: CreatePermissionUseCase;

describe("Create permission UseCase", () => {
    beforeEach(() => {
        permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
        createPermissionUseCase = new CreatePermissionUseCase(
            permissionsRepositoryInMemory
        );
    });

    it("should be able to create a new permission", async () => {
        const permission = {
            name: "test",
        };

        await createPermissionUseCase.execute(permission);
        const permissionCreated =
            await permissionsRepositoryInMemory.findByName(permission.name);

        expect(permissionCreated).toHaveProperty("id");
        expect(permissionsRepositoryInMemory.permissions.length).toBe(1);
    });

    it("Should not be able to create a new permission with same name", async () => {
        const firstPermission = {
            name: "test permission",
        };

        await createPermissionUseCase.execute(firstPermission);

        const secondPermission = {
            name: "test permission",
        };

        await expect(
            createPermissionUseCase.execute(secondPermission)
        ).rejects.toEqual(new CreatePermissionError());
    });
});
