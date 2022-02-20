import { ICreatePermissionDTO } from "../../dto/ICreatePermission";
import { Permission } from "../../entities/Permission";
import { IPermissionsRepository } from "../IPermissionsRepository";

class PermissionsRepositoryInMemory implements IPermissionsRepository {
    permissions: Permission[] = [];

    async create({ name }: ICreatePermissionDTO): Promise<Permission> {
        const permission = new Permission();
        Object.assign(permission, {
            name,
        });
        this.permissions.push(permission);
        return permission;
    }

    async findByName(name: string): Promise<Permission> {
        const permission = this.permissions.find(
            (permission) => permission.name === name
        );
        return permission;
    }

    async findById(id: string): Promise<Permission> {
        return this.permissions.find((permission) => permission.id === id);
    }
}

export { PermissionsRepositoryInMemory };
