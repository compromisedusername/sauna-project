import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {User} from './user.model';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  description!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name!: string;


  @OneToMany( ()=> User, (user: User) => user.role)
  @Column()
  users!: User[]
}
