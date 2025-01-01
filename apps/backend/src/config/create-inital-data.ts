import { DeepPartial, DataSource, Repository, ObjectLiteral } from "typeorm";
import { User } from "../entities/user.model";
import { Role } from "../entities/role.model";
import { Sauna } from "../entities/sauna.model";
import { Reservation } from "../entities/reservation.model";

import * as bcrypt from "bcrypt";

export const createInitialData = async (dataSource: DataSource) => {
  if (!dataSource.isInitialized) {
    console.log("Initializing data source...");
    await dataSource.initialize();
  }

  console.log("Data source initialized. Running seed...");

  await dataSource.transaction(async (manager) => {
    const roleRepository = manager.getRepository(Role);
    const userRepository = manager.getRepository(User);
    const saunaRepository = manager.getRepository(Sauna);
    const reservationRepository = manager.getRepository(Reservation);

    const adminRole = await validateUnique(
      roleRepository,
      { name: "admin" },
      { name: "admin", description: "Administrator" },
      "Role 'admin' already exists.",
    );

    const userRole = await validateUnique(
      roleRepository,
      { name: "user" },
      { name: "user", description: "Standard user" },
      "Role 'user' already exists.",
    );

    const saltRounds = 10;
    const passwordHashAdmin = await bcrypt.hash("admin123", saltRounds);
    const passwordHashUser = await bcrypt.hash("user123", saltRounds);

    const adminUser = await validateUnique(
      userRepository,
      { email: "admin@example.com" },
      {
        name: "Admin",
        surname: "Adminowski",
        email: "admin@example.com",
        passwordHash: passwordHashAdmin,
        role: adminRole,
      },
      "User with email 'admin@example.com' already exists.",
    );

    const regularUser = await validateUnique(
      userRepository,
      { email: "user@example.com" },
      {
        name: "User",
        surname: "Userowski",
        email: "user@example.com",
        passwordHash: passwordHashUser,
        role: userRole,
      },
      "User with email 'user@example.com' already exists.",
    );

    const sauna1 = await validateUnique(
      saunaRepository,
      { name: "ExampleName1" },
      {
        name: "ExampleName1",
        saunaType: "finnish",
        humidity: 10,
        temperature: 90,
        peopleCapacity: 6,
      },
      "Sauna 'finnish' already exists.",
    );

    const sauna2 = await validateUnique(
      saunaRepository,
      { name: "ExampleName2" },
      {
        name: "ExmapleName2",
        saunaType: "steam",
        humidity: 90,
        temperature: 50,
        peopleCapacity: 4,
      },
      "Sauna 'steam' already exists.",
    );

    await validateUnique(
      reservationRepository,
      { sauna: sauna1, user: regularUser, dateFrom: new Date() },
      {
        dateFrom: new Date(),
        dateTo: new Date(Date.now() + 3600000),
        numberOfPeople: 2,
        sauna: sauna1,
        user: regularUser,
      },
      "This reservation already exists.",
    );

    console.log("Seeding completed successfully.");
  }).then( async ()=>{
    await dataSource.destroy().then( ()=> {
      console.log("Database connection closed. Data seeded successfully");
    }).catch((error) => {
      console.error("Error occured during closing database connection, try seed again.", error)
    })
  }).catch( async (error)=>{
    console.error("Error while seeding occured, try seed again. ", error)
  });
};

async function validateUnique<T extends ObjectLiteral>(
  repository: Repository<T>,
  where: Partial<T>,
  data: DeepPartial<T>,
  errorMessage: string,
): Promise<T> {
  const existingRecord = await repository.findOneBy(where);
  if (existingRecord) {
    throw new Error(errorMessage);
  }
  const newRecord = repository.create(data);
  return repository.save(newRecord);
}
