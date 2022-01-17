import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Cat {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    breed: string;

    @Column()
    color: string;

    @Column()
    age: number

    @Column()
    price: number

    @Column({default: false})
    isReserved: boolean;

}