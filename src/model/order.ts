import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Order1 {
    @PrimaryGeneratedColumn()
    idOrder: number;
    @Column()
    idUser: number;
}