import { text } from "express";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  idHome: number;
  @Column()
  nameHome: string;
  @Column()
  address: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  floorArea: number;
  @Column()
  bedrooms: number;
  @Column()
  bathrooms: number;
  @Column()
  idCategory: number;
  @Column({ type: "text" })
  image: string;
  @Column({ default: 0 })
  count: number;
  @Column()
  idUser: number;
  @Column({default: "For rent"})
  status: string;
}
