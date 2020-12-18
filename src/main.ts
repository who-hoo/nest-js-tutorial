import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // true : 아무 데코레이터도 없는 어떤 프로퍼티의 오브젝트를 거른다.
    forbidNonWhitelisted: true, // true : 이상한 걸 보내면, 요청 자체를 막는다. 
    transform: true, // true : 사용자가 보낸 데이터를, 개발자가 원하는 타입으로 바꿔준다.
  }));
  await app.listen(3000);
}
bootstrap();
