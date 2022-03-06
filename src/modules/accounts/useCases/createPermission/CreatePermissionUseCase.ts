import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";
import { CreatePermissionError } from "./CreatePermissionError";

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
            throw new CreatePermissionError();
        }

        this.permissionsRepository.create({ name });
    }
}

export { CreatePermissionUseCase };
