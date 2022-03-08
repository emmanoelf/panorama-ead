import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Permission } from "./Permission";

@Entity("users")
class User {
    @PrimaryColumn()
    id?: string;

    @ManyToOne(() => Permission)
    @JoinColumn({ name: "permission_id" })
    permission: Permission;

    @Column()
    permission_id: string;

    @Column()
    ra?: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column()
    isFromHome: boolean;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };
