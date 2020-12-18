import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

/*
export class UpdateMovieDto{
    @IsString()
    readonly title?: string;

    @IsNumber()
    readonly year?: number;
    
    @IsString( { each: true })
    readonly genres?: string[];
}
*/

// PartialType()을 사용해 간단하게 코드를 짤 수 있다 !
// UpdateMovieDto는 CreateMovieDto와 같다 (전부 필수사항이 아니라는 것만 빼고)
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}