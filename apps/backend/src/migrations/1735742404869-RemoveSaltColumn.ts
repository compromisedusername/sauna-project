import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSaltColumn1735742404869 implements MigrationInterface {
    name = 'RemoveSaltColumn1735742404869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`salt\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`salt\` varchar(255) NOT NULL`);
    }

}
