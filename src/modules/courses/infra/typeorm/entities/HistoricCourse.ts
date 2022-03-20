import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("historic_courses")
class HistoricCourse {
    @PrimaryColumn()
    id: string;

    @Column()
    id_course: string;

    @Column()
    name_course: string;

    @Column()
    former_coordinator_name: string;

    @Column()
    former_coordinator_email: string;

    @Column()
    current_coordinator_name: string;

    @Column()
    current_coordinator_email: string;

    @Column()
    note: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { HistoricCourse };
