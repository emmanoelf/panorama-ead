import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { PeriodOffer } from "./PeriodOffer";

@Entity("solicitations")
class Solicitation {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => PeriodOffer)
    @JoinColumn({ name: "period_offer_id" })
    periodOffer: PeriodOffer;

    @Column()
    period_offer_id: string;

    @Column()
    expected_deadline: Date;

    @Column()
    deadline: Date;

    @Column()
    isFinished: boolean;

    @Column()
    note: string;

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

export { Solicitation };
