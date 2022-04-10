import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Message } from "./Message";

@Entity("chats")
class Chat {
    @PrimaryColumn()
    id: string;

    @Column()
    solicitation_id: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: "jsonb", nullable: true })
    messages: Message[];

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Chat };
