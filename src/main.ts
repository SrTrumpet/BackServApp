import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.enableCors({
    origin: "*", // Permite solo solicitudes CORS de este origen
    methods: "GET,POST,PUT,DELETE", // Métodos HTTP permitidos
    allowedHeaders: "Content-Type, Authorization", // Encabezados permitidos
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  await app.listen(3000);
}
bootstrap();
