import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "../entities/cats.entity";
import {FilesService} from "../files/files.service";
import PublicFile from "../entities/public-file.entity";

@Module({
    controllers: [CatsController],
    providers: [CatsService, FilesService],
    imports: [
        TypeOrmModule.forFeature([Cat, PublicFile])
    ],
    exports: [CatsService, FilesService]
    })
export class CatsModule {}
