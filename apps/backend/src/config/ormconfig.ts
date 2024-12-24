
import * as dotenv from 'dotenv'
dotenv.config();
import { DataSource } from "typeorm";
import {User} from './../models/user.model';
import {Role} from './../models/role.model';
import {Reservation} from './../models/reservation.model';
import {Sauna} from './../models/sauna.model';
const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.MYSQL_HOST || "localhost",
	port: Number(process.env.MYQSL_PORT) || 3306,
	username: process.env.MYSQL_USER || "root",
	password:  process.env.MYSQL_PASSWORD || "admin",
	database: process.env.MYSQL_DATABASE || "sauna-project",
	synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE) || true,
	logging:  Boolean(process.env.MYSQL_LOGGING) || true,
	entities: [User, Role, Reservation, Sauna],

});

AppDataSource.initialize()
	.then(() => {
		console.log("Data source has been initialized");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});
