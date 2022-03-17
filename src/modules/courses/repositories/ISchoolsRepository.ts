import { ICreateSchoolDTO } from "../dto/ICreateSchoolDTO";
import { School } from "../infra/typeorm/entities/School";

interface ISchoolsRepository {
    create(data: ICreateSchoolDTO): Promise<School>;
    findById(id: string): Promise<School>;
    findByDescription(description: string): Promise<School>;
}

export { ISchoolsRepository };
