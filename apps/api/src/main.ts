import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Agregar API a todas las rutas del backend
  await app.listen(3000);
}
bootstrap();
