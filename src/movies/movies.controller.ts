import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieID: number): Movie {
        return this.moviesService.getOne(movieID);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    delete(@Param('id') movieID: number) {
        return this.moviesService.delete(movieID);
    }

    @Patch('/:id')
    patch(@Param('id') movieID: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieID, updateData);
    }
}
