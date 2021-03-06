import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSolicitations1648320961236 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "solicitations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "period_offer_id",
                        type: "uuid",
                    },
                    {
                        name: "course_id",
                        type: "uuid",
                    },
                    {
                        name: "expected_deadline",
                        type: "timestamp",
                    },
                    {
                        name: "deadline",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "isFinished",
                        type: "boolean",
                        default: false,
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
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKPeriodOfferSolicitation",
                        referencedTableName: "period_offer",
                        referencedColumnNames: ["id"],
                        columnNames: ["period_offer_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "FKCourseSolicitation",
                        referencedTableName: "courses",
                        referencedColumnNames: ["id"],
                        columnNames: ["course_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("solicitations");
    }
}
