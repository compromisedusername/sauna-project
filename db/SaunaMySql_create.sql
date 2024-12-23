-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-12-23 20:22:54.491

-- tables
-- Table: Reservation
CREATE TABLE Reservation (
    id int  NOT NULL,
    date_from datetime  NOT NULL,
    date_to datetime  NOT NULL,
    number_of_people int  NOT NULL,
    sauna_id int  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT Reservation_pk PRIMARY KEY (id)
);

CREATE INDEX idx_reservation_sauna_id ON Reservation (sauna_id);

CREATE INDEX idx_reservation_user_id ON Reservation (user_id);

CREATE INDEX idx_reservation_date_from_date_to ON Reservation (date_from,date_to);

-- Table: Role
CREATE TABLE Role (
    id int  NOT NULL,
    description varchar(200)  NOT NULL,
    name varchar(20)  NOT NULL,
    CONSTRAINT Role_pk PRIMARY KEY (id)
);

-- Table: Sauna
CREATE TABLE Sauna (
    id int  NOT NULL,
    sauna_type varchar(50)  NOT NULL,
    humidity int  NOT NULL,
    temperature int  NOT NULL,
    people_capacity int  NOT NULL,
    CONSTRAINT Sauna_pk PRIMARY KEY (id)
);

-- Table: User
CREATE TABLE User (
    id int  NOT NULL,
    name varchar(60)  NOT NULL,
    surname varchar(60)  NOT NULL,
    email varchar(254)  NOT NULL,
    password_hash varchar(255)  NOT NULL,
    salt varchar(50)  NOT NULL,
    role_id int  NOT NULL,
    UNIQUE INDEX ak_user_email (email),
    CONSTRAINT User_pk PRIMARY KEY (id)
);

CREATE INDEX idx_user_role_id ON User (role_id);

-- foreign keys
-- Reference: Reservation_Sauna (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_Sauna FOREIGN KEY Reservation_Sauna (sauna_id)
    REFERENCES Sauna (id);

-- Reference: Reservation_User (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_User FOREIGN KEY Reservation_User (user_id)
    REFERENCES User (id);

-- Reference: User_Role (table: User)
ALTER TABLE User ADD CONSTRAINT User_Role FOREIGN KEY User_Role (role_id)
    REFERENCES Role (id);

-- End of file.

