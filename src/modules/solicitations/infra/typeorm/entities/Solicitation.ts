import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";

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

    @ManyToOne(() => Course)
    @JoinColumn({ name: "course_id" })
    course: Course;

    @Column()
    course_id: string;

    @ManyToMany(() => User)
    @JoinTable({
        name: "solicitations_users",
        joinColumns: [{ name: "solicitation_id" }],
        inverseJoinColumns: [{ name: "user_id" }],
    })
    users: User[];

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
