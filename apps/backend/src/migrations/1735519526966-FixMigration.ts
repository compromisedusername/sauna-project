import { MigrationInterface, QueryRunner } from "typeorm";

export class FixMigration1735519526966 implements MigrationInterface {
    name = 'FixMigration1735519526966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sauna\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sauna\` ADD \`test\` int NOT NULL`);
    }

}
