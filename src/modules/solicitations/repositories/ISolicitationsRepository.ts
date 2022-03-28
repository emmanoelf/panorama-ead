import { ICreateSolicitationDTO } from "../dto/ICreateSolicitationDTO";
import { Solicitation } from "../infra/typeorm/entities/Solicitation";

interface ISolicitationsRepository {
    create(data: ICreateSolicitationDTO): Promise<Solicitation>;
    findById(id: string): Promise<Solicitation>;
    findByName(name: string): Promise<Solicitation>;
    listAll(): Promise<any[]>;
}

export { ISolicitationsRepository };
