import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface ICreateSolicitationDTO {
    name: string;
    description: string;
    period_offer_id: string;
    course_id: string;
    expected_deadline: Date;
    note?: string;
    users?: User[];
    id?: string;
}

export { ICreateSolicitationDTO };
