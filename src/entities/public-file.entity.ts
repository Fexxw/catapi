import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
class PublicFile{
    @PrimaryColumn()
    key: string;

    @Column()
    url: string;
}
export default PublicFile;