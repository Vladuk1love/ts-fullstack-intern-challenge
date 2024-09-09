import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import {Like} from './likes.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Добавил для красоты

  @Column()
  email: string; // Является логином

  @Column()
  password: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
} 