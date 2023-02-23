import { text } from "express";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Home } from "./home";


@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    idImage: number;
    @Column({type: "text"})
    image: string;
    @Column()
    idHome: number;
}
