import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { School } from "../infra/typeorm/entities/School";

interface IUpdateCourseDTO {
    id: string;
    name: string;
    user_id: string;
    user: User;
    school_id: string;
    school: School;
}

export { IUpdateCourseDTO };
