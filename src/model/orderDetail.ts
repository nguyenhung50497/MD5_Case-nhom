import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    idOrderDetail: number;
    @Column()
    idHome: number;
    @Column()
    idOrder: number;
    @Column({type: "date",})
    timeRent: string;

}