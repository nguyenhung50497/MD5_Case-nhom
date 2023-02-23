import { text } from "express";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    idImage: number;
    @Column({type: "text"})
    image: string;
    @Column()
    idHome: number;
}
