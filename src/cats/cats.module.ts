import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cats-entity";

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    imports: [
        TypeOrmModule.forFeature([Cat])
    ],
    exports: [CatsService]
    })
export class CatsModule {}
