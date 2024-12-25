import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735140025557 implements MigrationInterface {
    name = 'Migrations1735140025557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`description\` varchar(200) NOT NULL, \`name\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sauna\` (\`id\` varchar(36) NOT NULL, \`saunaType\` varchar(50) NOT NULL, \`humidity\` int NOT NULL, \`temperature\` int NOT NULL, \`peopleCapacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` varchar(36) NOT NULL, \`dateFrom\` datetime NOT NULL, \`dateTo\` datetime NOT NULL, \`numberOfPeople\` int NULL, \`saunaId\` varchar(36) NULL, \`userId\` varchar(36) NULL, INDEX \`IDX_bcd64df2c31dd5633f419c088e\` (\`dateFrom\`, \`dateTo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(60) NOT NULL, \`surname\` varchar(60) NOT NULL, \`email\` varchar(254) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`salt\` varchar(50) NOT NULL, \`roleId\` varchar(36) NULL, INDEX \`IDX_c28e52f758e7bbc53828db9219\` (\`roleId\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_0d113dc073383590b006b9540da\` FOREIGN KEY (\`saunaId\`) REFERENCES \`sauna\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
        await queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_0d113dc073383590b006b9540da\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_c28e52f758e7bbc53828db9219\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_bcd64df2c31dd5633f419c088e\` ON \`reservation\``);
        await queryRunner.query(`DROP TABLE \`reservation\``);
        await queryRunner.query(`DROP TABLE \`sauna\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
