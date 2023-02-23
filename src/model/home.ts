import { text } from "express";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Image } from "./image";


@Entity()
export class Home {
    @PrimaryGeneratedColumn()
    idHome: number;
    @Column()
    nameHome: string;
    @Column()
    address: string
    @Column()
    description: string;
    @Column()
    price: number;
    @Column()
    idCategory: number;
    @Column({default: 0})
    count: number;
    @Column()
    idUser: number;
}
