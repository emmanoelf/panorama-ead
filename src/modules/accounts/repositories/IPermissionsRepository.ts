import { ICreatePermissionDTO } from "../dto/ICreatePermission";
import { Permission } from "../entities/Permission";

interface IPermissionsRepository {
    create(data: ICreatePermissionDTO): Promise<Permission>;
    findByName(name: string): Promise<Permission>;
    findById(id: string): Promise<Permission>;
}

export { IPermissionsRepository };
