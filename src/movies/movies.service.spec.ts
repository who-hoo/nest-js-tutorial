import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// 테스트를 묘사
describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트를 하기 전에 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  })
});
