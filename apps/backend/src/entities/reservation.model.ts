import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Sauna } from './sauna.model';
import { User } from './user.model';

@Entity()
@Index(['dateFrom', 'dateTo'])
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'datetime'})
  dateFrom!: Date;

  @Column({ type: 'datetime', nullable: false })
  dateTo!: Date;

  @Column({ type: 'int', nullable: true /* do zmiany na false, test*/ })
  numberOfPeople!: number;

  @ManyToOne(() => Sauna, (sauna) => sauna.reservations)
  sauna!: Sauna;

  @ManyToOne(() => User, (user) => user.reservations)
  user!: User;
}
