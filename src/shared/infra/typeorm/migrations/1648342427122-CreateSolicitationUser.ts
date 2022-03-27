import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSolicitationUser1648342427122 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "solicitations_users",
                columns: [
                    {
                        name: "solicitation_id",
                        type: "uuid",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKSolicitationUser",
                        referencedTableName: "solicitations",
                        referencedColumnNames: ["id"],
                        columnNames: ["solicitation_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKUserSolicitation",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "solicitations_users",
            "FKSolicitationUser"
        );

        await queryRunner.dropForeignKey(
            "solicitations_users",
            "FKUserSolicitation"
        );

        await queryRunner.dropDatabase("solicitations_users");
    }
}
