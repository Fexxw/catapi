import {Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import { CatsService } from './cats.service';
import {CatInterface} from "./entities/cats-interface";

@Controller('/cats')
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Body() catInterface: CatInterface) {
        return this.catsService.createCat(catInterface);
    }

    @Get()
    async getAll(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ){
        return await this.catsService.getAll({ limit, page });
    }

    @Get('/reserved')
    async getReserved(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ){
        return await this.catsService.getReserved({ limit, page });
    }

    @Get('/available')
    async getAvailable(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number
    ){
        return await this.catsService.getAvailable({ limit, page });
    }

    @Get('/search/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.catsService.getById(id)
    }

    @Put('/search/:id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() catInterface: CatInterface
        ) {
        return this.catsService.updatePost(id, catInterface)
    }

    @Delete('/search/:id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.catsService.deletePost(id)
    }
}
