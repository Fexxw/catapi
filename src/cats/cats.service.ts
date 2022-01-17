import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {Cat} from "./entities/cats.entity";
import {CatInterface} from "./entities/cats.interface";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>
    ){}

    async getAll(){
        return await this.catRepository.find();
    }

    async createCat(catInterface: CatInterface) {
        return await this.catRepository.save(catInterface)
    }

    async getReserved() {
        return await this.catRepository.find({ where: {isReserved: true } } );
    }

    async getAvailable() {
        return await this.catRepository.find({ where: {isReserved: false} } );
    }

    async getById(id: number) {
        return await this.catRepository.findOne(id)
    }

    async updatePost(id: number, catInterface: CatInterface) {
        return await this.catRepository.update(id, catInterface)
    }

    async deletePost(id: number){
        return await this.catRepository.delete(id)
    }
}
