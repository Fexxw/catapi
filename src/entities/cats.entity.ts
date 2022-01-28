import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import PublicFile from "./public-file.entity";


@Entity()
export class Cat {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    name?: string;

    @Column({nullable: true})
    breed?: string;

    @Column({nullable: true})
    color?: string;

    @Column({nullable: true})
    age?: number;

    @Column({nullable: true})
    price?: number;

    @OneToOne(() => PublicFile, {
        eager: true,
        nullable: true
    })
    @JoinColumn()
    photo?: PublicFile;


    @Column({default: false})
    isReserved: boolean;

}