

import { User } from '../entities/user.model';
import { Role } from '../entities/role.model';
import { Sauna } from '../entities/sauna.model';
import { Reservation } from '../entities/reservation.model';
import { DataSource } from "typeorm";
export default new DataSource({
	type: "mysql",
	host: process.env.MYSQL_HOST || "localhost",
	port: Number(process.env.MYSQL_PORT) || 3307,
	username: process.env.MYSQL_USER || "root",
	password: process.env.MYSQL_PASSWORD || "admin",
	database: process.env.MYSQL_DATABASE || "sauna-project",
	synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE) || false,
	logging: Boolean(process.env.MYSQL_LOGGING) || true,
	entities: [  User, Role, Sauna, Reservation],
	migrations: [ "src/migrations/**/*.ts"],
	subscribers: [],
	migrationsTableName: "migrations",
});
