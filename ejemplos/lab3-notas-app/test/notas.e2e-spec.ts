import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Nota } from '../src/notas/nota.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateNotaDto } from 'src/notas/dto/create-nota.dto';

describe('NotasController (e2e)', () => {
  let app: INestApplication;
  let notaRepository: Repository<Nota>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    notaRepository = moduleFixture.get<Repository<Nota>>(
      getRepositoryToken(Nota),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    const dataSource = app.get(DataSource);
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  afterEach(async () => {
    await notaRepository.clear();
  });

  describe('/notas (POST)', () => {
    it('debería crear una nueva nota', async () => {
      const createNotaDto = {
        title: 'Nota de prueba',
        content: 'Este es el contenido de prueba',
      };

      const response = await request(app.getHttpServer())
        .post('/notas')
        .send(createNotaDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toEqual(createNotaDto.title);
      expect(response.body.content).toEqual(createNotaDto.content);
    });

    it('debería fallar si no se proporciona el título', async () => {
      const invalidDto = {
        content: 'Content without title',
      } as CreateNotaDto;

      const response = await request(app.getHttpServer())
        .post('/notas')
        .send(invalidDto);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('The title is required');
    });

    it('deberia fallar si no se proporciona el contenido', async () => {
      const invalidDto = {
        title: 'Title without content',
      } as CreateNotaDto;

      const response = await request(app.getHttpServer())
        .post('/notas')
        .send(invalidDto);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('The content is required');
    });
  });
});
