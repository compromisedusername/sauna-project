-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-01-06 12:15:56.868

-- tables
-- Table: Reservation
CREATE TABLE Reservation (
    id int  NOT NULL,
    date_from timestamp  NOT NULL,
    date_to timestamp  NOT NULL,
    number_of_people int  NOT NULL,
    user_id int  NOT NULL,
    sauna_id int  NOT NULL,
    CONSTRAINT Reservation_pk PRIMARY KEY (id)
);

-- Table: Role
CREATE TABLE Role (
    id int  NOT NULL,
    description varchar(20)  NOT NULL,
    name varchar(20)  NOT NULL,
    CONSTRAINT Role_pk PRIMARY KEY (id)
);

-- Table: Sauna
CREATE TABLE Sauna (
    id int  NOT NULL,
    sauna_type varchar(20)  NOT NULL,
    humidity int  NOT NULL,
    temperature int  NOT NULL,
    people_capacity int  NOT NULL,
    name varchar(50)  NOT NULL,
    CONSTRAINT Sauna_pk PRIMARY KEY (id)
);

-- Table: User
CREATE TABLE "User" (
    id int  NOT NULL,
    name varchar(60)  NOT NULL,
    surname varchar(60)  NOT NULL,
    email varchar(200)  NOT NULL,
    password_hash varchar(255)  NOT NULL,
    role_id int  NOT NULL,
    CONSTRAINT User_ak_1 UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT User_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Reservation_Sauna (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_Sauna
    FOREIGN KEY (sauna_id)
    REFERENCES Sauna (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Reservation_User (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_User
    FOREIGN KEY (user_id)
    REFERENCES "User" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: User_Role (table: User)
ALTER TABLE "User" ADD CONSTRAINT User_Role
    FOREIGN KEY (role_id)
    REFERENCES Role (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

