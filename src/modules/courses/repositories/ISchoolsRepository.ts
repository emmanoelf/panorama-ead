import { ICreateSchoolDTO } from "../dto/ICreateSchoolDTO";
import { School } from "../infra/typeorm/entities/School";

interface ISchoolsRepository {
    create(data: ICreateSchoolDTO): Promise<School>;
    findById(id: string): Promise<School>;
    findByDescription(description: string): Promise<School>;
    listAll(): Promise<School[]>;
    update(id: string, newDescription: string): Promise<void>;
    deleteById(id: string): Promise<void>;
}

export { ISchoolsRepository };
