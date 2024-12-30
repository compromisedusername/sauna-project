import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrationxd1735519458418 implements MigrationInterface {
    name = 'Migrationxd1735519458418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sauna\` ADD \`test\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sauna\` DROP COLUMN \`test\``);
    }

}
