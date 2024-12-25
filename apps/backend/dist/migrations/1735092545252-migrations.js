"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1735092545252 = void 0;
class Migrations1735092545252 {
    constructor() {
        this.name = 'Migrations1735092545252';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`description\` varchar(200) NOT NULL, \`name\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`sauna\` (\`id\` varchar(36) NOT NULL, \`saunaType\` varchar(50) NOT NULL, \`humidity\` int NOT NULL, \`temperature\` int NOT NULL, \`peopleCapacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`reservation\` (\`id\` varchar(36) NOT NULL, \`dateFrom\` datetime NOT NULL, \`dateTo\` datetime NOT NULL, \`numberOfPeople\` int NOT NULL, \`saunaId\` varchar(36) NULL, \`userId\` varchar(36) NULL, INDEX \`IDX_bcd64df2c31dd5633f419c088e\` (\`dateFrom\`, \`dateTo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(60) NOT NULL, \`surname\` varchar(60) NOT NULL, \`email\` varchar(254) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`salt\` varchar(50) NOT NULL, \`roleId\` varchar(36) NULL, INDEX \`IDX_c28e52f758e7bbc53828db9219\` (\`roleId\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_0d113dc073383590b006b9540da\` FOREIGN KEY (\`saunaId\`) REFERENCES \`sauna\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`reservation\` ADD CONSTRAINT \`FK_529dceb01ef681127fef04d755d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
            yield queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_529dceb01ef681127fef04d755d\``);
            yield queryRunner.query(`ALTER TABLE \`reservation\` DROP FOREIGN KEY \`FK_0d113dc073383590b006b9540da\``);
            yield queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
            yield queryRunner.query(`DROP INDEX \`IDX_c28e52f758e7bbc53828db9219\` ON \`user\``);
            yield queryRunner.query(`DROP TABLE \`user\``);
            yield queryRunner.query(`DROP INDEX \`IDX_bcd64df2c31dd5633f419c088e\` ON \`reservation\``);
            yield queryRunner.query(`DROP TABLE \`reservation\``);
            yield queryRunner.query(`DROP TABLE \`sauna\``);
            yield queryRunner.query(`DROP TABLE \`role\``);
        });
    }
}
exports.Migrations1735092545252 = Migrations1735092545252;
