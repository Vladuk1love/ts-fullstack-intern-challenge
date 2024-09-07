import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import {User} from './users.entity'


@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  url: string;

  @Column({unique: true})
  imageID:string

  @Column()
  liked: boolean;

  @ManyToMany(() => User, (user) => user.likes)
  user: User;
}