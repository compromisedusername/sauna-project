-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-01-06 12:15:56.868

-- foreign keys
ALTER TABLE Reservation
    DROP CONSTRAINT Reservation_Sauna;

ALTER TABLE Reservation
    DROP CONSTRAINT Reservation_User;

ALTER TABLE "User"
    DROP CONSTRAINT User_Role;

-- tables
DROP TABLE Reservation;

DROP TABLE Role;

DROP TABLE Sauna;

DROP TABLE "User";

-- End of file.

