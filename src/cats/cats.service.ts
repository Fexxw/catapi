import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import {Cat} from "./entities/cats-entity";
import {CatInterface} from "./entities/cats-interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Pagination} from "../pagination/paginate";
import {PaginationOptionsInterface} from "../pagination/pagination-options-interface";

@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>
    ){}

    async getAll( options: PaginationOptionsInterface ) {
        const [results, total] = await this.catRepository.findAndCount({
            take: options.limit,
            skip: options.page * options.limit,
        });

        return new Pagination<Cat>({
            results,
            total,
        });
    }

    async createCat(catInterface: CatInterface) {
        return await this.catRepository.save(catInterface)
    }

    async getReserved( options: PaginationOptionsInterface ) {
        const [results, total] = await this.catRepository.findAndCount({
            where: { isReserved: true },
            take: options.limit,
            skip: options.page * options.limit,
        });

        return new Pagination<Cat>({
            results,
            total,
        });
    }

    async getAvailable( options: PaginationOptionsInterface ) {
        const [results, total] = await this.catRepository.findAndCount({
            where: { isReserved: false },
            take: options.limit,
            skip: options.page * options.limit,
        });

        return new Pagination<Cat>({
            results,
            total,
        });
    }

    async getById(id) {
        return await this.catRepository.findOne(id)
    }

    async updatePost(id, catInterface: CatInterface) {
        return await this.catRepository.update(id, catInterface)
    }

    async deletePost(id){
        return await this.catRepository.delete(id)
    }
}
