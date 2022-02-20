import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";

interface IRequest {
    name: string;
}

class CreatePermissionUseCase {
    constructor(private permissionsRepository: IPermissionsRepository) {}

    async execute({ name }: IRequest): Promise<void> {
        const permissionExists = await this.permissionsRepository.findByName(
            name
        );

        if (permissionExists) {
            throw new Error("Esta permissão já existe");
        }

        this.permissionsRepository.create({ name });
    }
}

export { CreatePermissionUseCase };
