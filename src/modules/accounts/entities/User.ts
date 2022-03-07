import { v4 as uuidV4 } from "uuid";

class User {
    id?: string;
    idPermission: string;
    ra?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    isFromHome: boolean;
    created_at: Date;
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };
