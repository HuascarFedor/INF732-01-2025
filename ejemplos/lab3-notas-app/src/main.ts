import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Configuracion de Swagger
  const config = new DocumentBuilder()
    .setTitle('Api - Ejemplo')
    .setDescription('Documentacion de la Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
