import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameColumnAtSauna1735479937562 implements MigrationInterface {
    name = 'AddNameColumnAtSauna1735479937562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sauna\` ADD \`name\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sauna\` DROP COLUMN \`name\``);
    }

}
