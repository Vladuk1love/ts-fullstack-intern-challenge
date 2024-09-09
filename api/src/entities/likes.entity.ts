import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';
import {User} from './users.entity'


@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  url: string;

  @Column({unique: true})
  imageID:string

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}