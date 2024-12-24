import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Sauna } from './sauna.model';
import { User } from './user.model';

@Entity()
@Index(['dateFrom', 'dateTo'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime', nullable: false })
  dateFrom!: Date;

  @Column({ type: 'datetime', nullable: false })
  dateTo!: Date;

  @Column({ type: 'int', nullable: false })
  numberOfPeople!: number;

  @ManyToOne(() => Sauna, (sauna: Sauna) => sauna.reservations)
  @Column({ nullable: false })
  sauna!: Sauna;

  @ManyToOne(() => User, (user: User) => user.reservations)
  @Column({  nullable: false })
  user!: User;
}
