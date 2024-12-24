import { DataSource } from "typeorm";
import {User} from './../models/user.model';
import {Role} from './../models/role.model';
import {Reservation} from './../models/reservation.model';
import {Sauna} from './../models/sauna.model';


export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.MYSQL_HOST || "localhost",
	port: Number(process.env.MYSQL_PORT) || 3307,
	username: process.env.MYSQL_USER || "root",
	password:  process.env.MYSQL_PASSWORD || "admin",
	database: process.env.MYSQL_DATABASE || "sauna-project",
	synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE) || true,
	logging:  Boolean(process.env.MYSQL_LOGGING) || true,
	entities: [User, Role, Reservation, Sauna],

});


export const initialize = ()=> AppDataSource.initialize()
	.then(() => {
	  console.log(process.env.MYSQL_HOST)
		console.log("Data source has been initialized");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

