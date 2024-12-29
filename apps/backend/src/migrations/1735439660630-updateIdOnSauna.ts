import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIdOnSauna1735439660630 implements MigrationInterface {
    name = 'UpdateIdOnSauna1735439660630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_0d113dc073383590b006b9540da\``);
        await queryRunner.query(`ALTER TABLE \`sauna\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`sauna\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`sauna\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`saunaId\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`saunaId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_0d113dc073383590b006b9540da\` FOREIGN KEY (\`saunaId\`) REFERENCES \`sauna\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_0d113dc073383590b006b9540da\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`saunaId\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`saunaId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sauna\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`sauna\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sauna\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_0d113dc073383590b006b9540da\` FOREIGN KEY (\`saunaId\`) REFERENCES \`sauna\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
