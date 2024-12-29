import path from "path/posix"
import {createGenerator } from "ts-json-schema-generator"

const config = {
  path: __filename,
  tsconfig: path.join(__dirname, '../../tsconfig.json'),
}



const schemaGenerator = createGenerator(config);

const schemaSauna = schemaGenerator.createSchema('Sauna')
const schemaReservation = schemaGenerator.createSchema('Reservation')

console.log(JSON.stringify(schemaSauna, null, 2),  JSON.stringify(schemaReservation, null, 2))
