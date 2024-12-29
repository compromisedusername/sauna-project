import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIdOnTables1735439524094 implements MigrationInterface {
    name = 'UpdateIdOnTables1735439524094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`role\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`DROP INDEX \`IDX_c28e52f758e7bbc53828db9219\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_c28e52f758e7bbc53828db9219\` ON \`user\` (\`roleId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`DROP INDEX \`IDX_c28e52f758e7bbc53828db9219\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roleId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_c28e52f758e7bbc53828db9219\` ON \`user\` (\`roleId\`)`);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`role\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`role\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
