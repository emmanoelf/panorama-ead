import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

class Message {
    id: string;
    message: string;
    user_id: User;
    created_at: Date;

    constructor(message: string, user_id: User) {
        this.id = uuidV4();
        this.message = message;
        this.user_id = user_id;
        this.created_at = new Date();
    }
}

export { Message };
