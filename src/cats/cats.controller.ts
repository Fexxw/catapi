import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import { CatsService } from './cats.service';
import {CatInterface} from "./entities/cats.interface";

@Controller('/cats')
export class CatsController {

    constructor(private catsService: CatsService) {}

    @Post()
    create(@Body() catInterface: CatInterface) {
        return this.catsService.createCat(catInterface);
    }

    @Get()
    async getAll(
        @Query('limit') limit: number,
        @Query('page') page: number
    ){
        return await this.catsService.getAll({
            limit: limit || 10,
            page: page || 0,
        });
    }

    @Get('/reserved')
    getReserved(){
        return this.catsService.getReserved()
    }

    @Get('/available')
    getAvailable(){
        return this.catsService.getAvailable()
    }

    @Get('/search/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.catsService.getById(id)
    }

    @Put('/search/:id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() catInterface: CatInterface
        ) {
        return this.catsService.updatePost(id, catInterface)
    }

    @Delete('/search/:id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.catsService.deletePost(id)
    }
}
