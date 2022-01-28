import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { CatsService } from './cats.service';
import {CatInterface} from "./cats-interface";
import {FileInterceptor} from "@nestjs/platform-express";

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

    @Get(':uuid')
    async getById(@Param('uuid', ParseUUIDPipe) id: string) {
        return this.catsService.getById(id)
    }

    @Put(':uuid')
    async update(
        @Param('uuid', ParseUUIDPipe) id: string,
        @Body() catInterface: CatInterface
        ) {
        return this.catsService.updatePost(id, catInterface)
    }

    @Put('/reserve/:uuid')
    async reserve(@Param('uuid', ParseUUIDPipe) id: string){
        return this.catsService.reservePost(id)
    }

    @Post('/photo-upload/:uuid')
    @UseInterceptors(FileInterceptor('file'))
    async addPhoto(@Param('uuid', ParseUUIDPipe) id: string, @UploadedFile() file: Express.Multer.File){
        return this.catsService.addPhoto(id, file.buffer, file.originalname)
    }

    @Delete('/photo-delete/:uuid')
    async deleteFile(@Param('uuid', ParseUUIDPipe) id: string){
        return this.catsService.deletePhoto(id)
    }

    @Delete(':uuid')
    async delete(@Param('uuid', ParseIntPipe) id: string){
        return this.catsService.deletePost(id)
    }
}
