import { ICreateSolicitationDTO } from "../dto/ICreateSolicitationDTO";
import { IUpdateSolicitationDTO } from "../dto/IUpdateSolicitationDTO";
import { Solicitation } from "../infra/typeorm/entities/Solicitation";

interface ISolicitationsRepository {
    create(data: ICreateSolicitationDTO): Promise<Solicitation>;
    findById(id: string): Promise<Solicitation>;
    findByName(name: string): Promise<Solicitation>;
    listAll(): Promise<any[]>;
    isFinished(id: string): Promise<void>;
    listOneSolicitationUsers(id: string): Promise<any>;
    update(data: IUpdateSolicitationDTO): Promise<void>;
}

export { ISolicitationsRepository };
