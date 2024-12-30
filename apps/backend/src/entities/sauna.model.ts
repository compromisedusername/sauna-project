import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reservation } from "./reservation.model";

@Entity()
export class Sauna {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name?: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  saunaType?: string;

  @Column({ type: "int", nullable: false })
  humidity?: number;

  @Column({ type: "int", nullable: false })
  temperature?: number;

  @Column({ type: "int", nullable: false })
  peopleCapacity?: number;


  @OneToMany(
    () => Reservation,
    (reservation) => reservation.sauna,
  )
  reservations?: Reservation[];
}
