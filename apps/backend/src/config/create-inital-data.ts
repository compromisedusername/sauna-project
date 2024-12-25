import { DataSource } from 'typeorm';
import { User } from '../entities/user.model';
import { Role } from '../entities/role.model';
import { Sauna } from '../entities/sauna.model';
import { Reservation } from '../entities/reservation.model';
import * as bcrypt from 'bcrypt';


export const seed =  async (dataSource: DataSource) => {
    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);
    const saunaRepository = dataSource.getRepository(Sauna);
    const reservationRepository = dataSource.getRepository(Reservation);

    const adminRole = roleRepository.create({ name: 'admin', description: 'Administrator' });
    const userRole = roleRepository.create({ name: 'user', description: 'Standard user' });
    await roleRepository.save([adminRole, userRole]);

    const saltRounds = 10;
    const passwordHashAdmin = await bcrypt.hash('admin123', saltRounds);
    const passwordHashUser = await bcrypt.hash('user123', saltRounds);

    const adminUser = userRepository.create({
        name: 'Admin',
        surname: 'Adminowski',
        email: 'admin@example.com',
        passwordHash: passwordHashAdmin,
        salt: 'some_salt',
        role: adminRole,
    });

    const regularUser = userRepository.create({
        name: 'User',
        surname: 'Userowski',
        email: 'user@example.com',
        passwordHash: passwordHashUser,
        salt: 'another_salt',
        role: userRole,
    });
    await userRepository.save([adminUser, regularUser]);

    const sauna1 = saunaRepository.create({ saunaType: 'Fińska', humidity: 10, temperature: 90, peopleCapacity: 6 });
    const sauna2 = saunaRepository.create({ saunaType: 'Parowa', humidity: 90, temperature: 50, peopleCapacity: 4 });
    await saunaRepository.save([sauna1, sauna2]);

    const reservation1 = reservationRepository.create({ dateFrom: new Date(), dateTo: new Date(Date.now() + 3600000), numberOfPeople: 2, sauna: sauna1, user: regularUser });
    await reservationRepository.save(reservation1);
};
