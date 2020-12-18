import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        // const movie = this.movies.find(movie => movie.id === +id);
        // ValidationPipe에 transform을 주어서 형변환을 안해줘도 된다 ! (야호)
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }

        return movie;
    }

    delete(id: number) {
        this.getOne(id);
        // this.movies = this.movies.filter(movie => movie.id !== +id);
        // ValidationPipe에 transform을 주어서 형변환을 안해줘도 된다 ! (야호)
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.delete(id);
        this.movies.push({ ...movie, ...updateData});
    }
}
