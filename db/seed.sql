-- Seed dla tabeli Role
INSERT INTO Role (id, description, name) VALUES
(1, 'Administrator with full access rights', 'Admin'),
(2, 'Manager who can manage bookings and users', 'Manager'),
(3, 'Guest with limited access, can only make reservations', 'Guest');

-- Seed dla tabeli Sauna
INSERT INTO Sauna (id, sauna_type, humidity, temperature, people_capacity) VALUES
(1, 'Finnish Sauna', 10, 85, 10),
(2, 'Infrared Sauna', 15, 60, 4),
(3, 'Steam Sauna', 60, 45, 6);

-- Seed dla tabeli User
INSERT INTO User (id, name, surname, email, password_hash, salt, role_id) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'hashedpassword1', 'salt1', 1),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', 'salt2', 2),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', 'hashedpassword3', 'salt3', 3);

-- Seed dla tabeli Reservation
INSERT INTO Reservation (id, date_from, date_to, number_of_people, sauna_id, user_id) VALUES
(1, '2024-12-25 10:00:00', '2024-12-25 12:00:00', 4, 1, 3),
(2, '2024-12-26 14:00:00', '2024-12-26 16:00:00', 6, 2, 1),
(3, '2024-12-27 09:00:00', '2024-12-27 11:00:00', 2, 3, 2),
(4, '2024-12-28 11:00:00', '2024-12-28 13:00:00', 5, 1, 3);

