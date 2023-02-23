import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    idOrder: number;
    @Column()
    nameOrder: string;
    @Column()
    idUser: number;
    @Column({default: 0})
    countHomeOrder: number;
}