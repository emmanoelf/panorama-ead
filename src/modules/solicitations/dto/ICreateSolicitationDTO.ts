import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface ICreateSolicitationDTO {
    id?: string;
    name: string;
    description: string;
    period_offer_id: string;
    expected_deadline: Date;
    note?: string;
    users?: User[];
}

export { ICreateSolicitationDTO };
