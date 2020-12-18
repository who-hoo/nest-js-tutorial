import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll() {
        return 'This will return all movies';
    }

    @Get('search') // search 부분이 get보다 밑에 있으면 search를 id로 판단하는 것 유의
    search(@Query("year") searchingYear: string) {
        return `We are searching for a movie made after: ${searchingYear}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieID: string) {
        return `This will return one movie with the id: ${movieID}`;
    }

    @Post()
    create(@Body() movieData) {
        // return 'This will create a movie'
        return movieData;
    }

    @Delete('/:id')
    delete(@Param('id') movieID: string) {
        return `This will delete a movie with the id : ${movieID}`;
    }

    @Patch('/:id')
    patch(@Param('id') movieID: string, @Body() updateData) {
        // return `This will patch a movie with the id: ${movieID}`;
        return {
            updatedMovie: movieID,
            ...updateData,
        };
    }
}
