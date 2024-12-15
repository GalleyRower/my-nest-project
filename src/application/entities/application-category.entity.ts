import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import { Application } from "./application.entity";

@Entity('application_categories')
export class ApplicationCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Application, (application) => application.categories)
  applications: Application[];
}