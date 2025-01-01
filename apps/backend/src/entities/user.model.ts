import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    Unique,
    Index,
} from "typeorm";
import { Role } from "./role.model";
import { Reservation } from "./reservation.model";

@Entity()
@Unique(["email"])
@Index(["role"])
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 60, nullable: false })
    name?: string;

    @Column({ type: "varchar", length: 60, nullable: false })
    surname?: string;

    @Column({ type: "varchar", length: 254, nullable: false })
    email?: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    passwordHash?: string;


    @ManyToOne(
        () => Role,
        (role) => role.users,
    )
    role?: Role;

    @OneToMany(
        () => Reservation,
        (reservation) => reservation.user,
    )
    reservations?: Reservation[];
}
