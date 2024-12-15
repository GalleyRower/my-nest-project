import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ApplicationCategory } from "./application-category.entity";

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => ApplicationCategory, { eager: true })
  @JoinTable({ name: 'application_application_categories' })
  categories: ApplicationCategory[];
}