import {Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import {Cat} from "../entities/cats.entity";
import {CatInterface} from "./cats-interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Pagination} from "../pagination/paginate";
import {PaginationOptionsInterface} from "../pagination/pagination-options-interface";
import {FilesService} from "../files/files.service";

@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>,
        private readonly filesService: FilesService
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

    async reservePost(id){
        return await this.catRepository.update({id},{isReserved: true})
    }

    async deletePost(id){
        return await this.catRepository.delete(id)
    }

    async addPhoto(id: string, imageBuffer: Buffer, filename: string) {
        const cat = await this.getById(id);
        if (cat.photo) {
            await this.catRepository.update(id, {...cat, photo: null});
            await this.filesService.deletePublicFile(cat.photo.key);
        }
        const photo = await this.filesService.uploadPublicFile(imageBuffer, filename);
        await this.catRepository.update(id, {...cat, photo});
        return photo;
    }

    async deletePhoto(id: string) {
        const cat = await this.getById(id);
        const fileKey = cat.photo?.key;
        if (fileKey) {
            await this.catRepository.update(id, {...cat, photo: null});
            await this.filesService.deletePublicFile(fileKey)
        }
    }
}
