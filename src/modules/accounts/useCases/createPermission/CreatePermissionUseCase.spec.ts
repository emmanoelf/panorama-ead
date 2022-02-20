import { PermissionsRepositoryInMemory } from "../../repositories/in-memory/PermissionsRepositoryInMemory";
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

        console.log({ permissionCreated });

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
        ).rejects.toEqual(new Error("Esta permissão já existe"));
    });

    it("should be able to search by id", async () => {
        const permissionInsert = await permissionsRepositoryInMemory.create({
            name: "test",
        });

        const searchId = await permissionsRepositoryInMemory.findById(
            permissionInsert.id
        );

        expect(permissionInsert).toEqual(searchId);
    });
});
