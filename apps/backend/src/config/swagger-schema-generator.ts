import { createGenerator } from "ts-json-schema-generator";
import path from "path/posix";

const config = {
  path: __filename,
  tsconfig: path.join(__dirname, "../../tsconfig.json"),
  exclude: ["./../types/express.d.ts"]
};

const schemaGenerator = createGenerator(config);
// SAUNA
import { AddSaunaRequest } from "../dto/request/add.sauna.request";
import { UpdateSaunaRequest } from "../dto/request/update.sauna.request";
import { Sauna } from "../entities/sauna.model";
// USER
import { RegisterUserRequest } from "../dto/request/register.user.request";
import { AddUserRequest } from "../dto/request/add.user.request";
import { UpdateUserRequest } from "../dto/request/update.user.request";
import { User } from "../entities/user.model";
// RESERVATION
import { Reservation } from "../entities/reservation.model";
import { AddReservationRequest } from "../dto/request/add.reservation.request";
import { UpdateReservationRequest } from "../dto/request/update.reservation.request";
//ROLE
import { Role } from "../entities/role.model";
import { AddRoleRequest } from "../dto/request/add.role.request";
import { UpdateRoleRequest } from "../dto/request/update.role.request";
const schemas = {
  // SAUNA
  Sauna: schemaGenerator.createSchema("Sauna"),
  AddSaunaRequest: schemaGenerator.createSchema("AddSaunaRequest"),
  UpdateSaunaRequest: schemaGenerator.createSchema("UpdateSaunaRequest"),
  // USER
  User: schemaGenerator.createSchema("User"),
  RegisterUserRequest: schemaGenerator.createSchema("RegisterUserRequest"),
  AddUserRequest: schemaGenerator.createSchema("AddUserRequest"),
  UpdateUserRequest: schemaGenerator.createSchema("UpdateUserRequest"),
  // RESERVATION
  Reservation: schemaGenerator.createSchema("Reservation"),
  AddReservationRequest: schemaGenerator.createSchema("AddReservationRequest"),
  UpdateReservationRequest: schemaGenerator.createSchema(
    "UpdateReservationRequest",
  ),
  // ROLE
  Role: schemaGenerator.createSchema("Role"),
  AddRoleRequest: schemaGenerator.createSchema("AddRoleRequest"),
  UpdateRoleRequest: schemaGenerator.createSchema("UpdateRoleRequest"),
};

const extractDefinitions = (schemas: Record<string, any>) => {
  const allDefinitions: Record<string, any> = {};

  for (const [key, schema] of Object.entries(schemas)) {
    const parsedSchema = JSON.parse(JSON.stringify(schema));
    if (parsedSchema.definitions) {
      Object.assign(allDefinitions, parsedSchema.definitions);
    } else {
      allDefinitions[key] = parsedSchema;
    }
  }

  return allDefinitions;
};
const schemasDefinitions = extractDefinitions(schemas);
export default schemasDefinitions;
