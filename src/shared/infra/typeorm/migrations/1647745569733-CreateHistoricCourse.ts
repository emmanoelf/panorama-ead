import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHistoricCourse1647745569733 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "historic_courses",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "id_course",
                        type: "uuid",
                    },
                    {
                        name: "name_course",
                        type: "varchar",
                    },
                    {
                        name: "former_coordinator_name",
                        type: "varchar",
                    },
                    {
                        name: "former_coordinator_email",
                        type: "varchar",
                    },
                    {
                        name: "current_coordinator_name",
                        type: "varchar",
                    },
                    {
                        name: "current_coordinator_email",
                        type: "varchar",
                    },
                    {
                        name: "note",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("historic_courses");
    }
}
