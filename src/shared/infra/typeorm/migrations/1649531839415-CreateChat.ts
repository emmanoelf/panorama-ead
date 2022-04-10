import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateChat1649531839415 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "chats",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "solicitation_id",
                        type: "uuid",
                    },
                    {
                        name: "messages",
                        type: "jsonb",
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
                        name: "FKSolicitation",
                        referencedTableName: "solicitations",
                        referencedColumnNames: ["id"],
                        columnNames: ["solicitation_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("chat", "FKSolicitation");
        await queryRunner.dropTable("chat");
    }
}
