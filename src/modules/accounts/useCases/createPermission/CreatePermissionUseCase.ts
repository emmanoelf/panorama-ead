import { Permission } from "../../entities/Permission";
import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";
import { CreatePermissionError } from "./CreatePermissionError";

interface IRequest {
    name: string;
}

class CreatePermissionUseCase {
    constructor(private permissionsRepository: IPermissionsRepository) {}

    async execute({ name }: IRequest): Promise<Permission> {
        const permissionExists = await this.permissionsRepository.findByName(
            name
        );

        if (permissionExists) {
            throw new CreatePermissionError();
        }

        const permission = this.permissionsRepository.create({ name });

        return permission;
    }
}

export { CreatePermissionUseCase };
