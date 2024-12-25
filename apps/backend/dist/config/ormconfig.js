"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../entities/user.model");
const role_model_1 = require("../entities/role.model");
const sauna_model_1 = require("../entities/sauna.model");
const reservation_model_1 = require("../entities/reservation.model");
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: Number(process.env.MYSQL_PORT) || 3307,
    username: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "admin",
    database: process.env.MYSQL_DATABASE || "sauna-project",
    synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE) || true,
    logging: Boolean(process.env.MYSQL_LOGGING) || true,
    entities: [user_model_1.User, role_model_1.Role, sauna_model_1.Sauna, reservation_model_1.Reservation],
    migrations: ["./../migrations/*.ts"],
    subscribers: [],
    migrationsTableName: "migrations",
});
