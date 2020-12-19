import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });

  describe("delete", () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const allmovies = service.getAll().length;
      service.delete(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allmovies);
    });

    it('should return 404 error', () => {
      try {
        service.delete(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      service.update(1, { title: 'Update Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Test');
    })

    it('should throw 404 error', () => {
      try {
        service.update(999, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
