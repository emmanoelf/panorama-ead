import { getRepository, Repository } from "typeorm";

import { ICreatePermissionDTO } from "../dto/ICreatePermission";
import { Permission } from "../entities/Permission";
import { IPermissionsRepository } from "./IPermissionsRepository";

class PermissionsRepository implements IPermissionsRepository {
    private repository: Repository<Permission>;

    constructor() {
        this.repository = getRepository(Permission);
    }

    async create({ name }: ICreatePermissionDTO): Promise<Permission> {
        const permission = this.repository.create({ name });
        this.repository.save(permission);
        return permission;
    }

    async findByName(name: string): Promise<Permission> {
        const permission = await this.repository.findOne({ name });
        return permission;
    }

    async findById(id: string): Promise<Permission> {
        const permission = await this.repository.findOne({ id });
        return permission;
    }
}

export { PermissionsRepository };
