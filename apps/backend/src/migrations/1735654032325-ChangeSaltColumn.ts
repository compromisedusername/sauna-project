import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSaltColumn1735654032325 implements MigrationInterface {
    name = 'ChangeSaltColumn1735654032325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(50) NOT NULL`);
    }

}
