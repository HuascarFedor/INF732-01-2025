import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ¡Esto es clave! Activa la validación automática
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos no declarados en el DTO
      forbidNonWhitelisted: true, // Rechaza solicitudes con campos extraños
      transform: true, // Convierte tipos (ej.: string -> number)
      disableErrorMessages: false, // Habilita mensajes de error detallados
    }),
  );

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
