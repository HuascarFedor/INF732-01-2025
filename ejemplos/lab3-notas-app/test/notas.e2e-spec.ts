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
  describe('/notas (GET)', () => {
    it('debería devolver todas las notas', async () => {
      const createNotaDto1 = {
        title: 'Nota 1',
        content: 'Contenido de la nota 1',
      };

      const createNotaDto2 = {
        title: 'Nota 2',
        content: 'Contenido de la nota 2',
      };

      await notaRepository.save(createNotaDto1);
      await notaRepository.save(createNotaDto2);

      const response = await request(app.getHttpServer())
        .get('/notas')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0].title).toEqual(createNotaDto1.title);
      expect(response.body[0].content).toEqual(createNotaDto1.content);
    });
  });
  describe('/notas/:id (GET)', () => {
    it('debería devolver una nota por ID', async () => {
      const createNotaDto = {
        title: 'Nota de prueba',
        content: 'Contenido de la nota de prueba',
      };

      const nota = await notaRepository.save(createNotaDto);

      const response = await request(app.getHttpServer())
        .get(`/notas/${nota.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toEqual(createNotaDto.title);
      expect(response.body.content).toEqual(createNotaDto.content);
    });

    it('debería devolver un error 404 si la nota no existe', async () => {
      const response = await request(app.getHttpServer())
        .get('/notas/999')
        .expect(404);

      expect(response.body.message).toContain('Nota con ID 999 no encontrada');
    });
  });
  describe('/notas/:id (PUT)', () => {
    it('debería actualizar una nota existente', async () => {
      const createNotaDto = {
        title: 'Nota de prueba',
        content: 'Contenido de la nota de prueba',
      };

      const nota = await notaRepository.save(createNotaDto);

      const updateNotaDto = {
        title: 'Nota actualizada',
        content: 'Contenido actualizado',
      };

      const response = await request(app.getHttpServer())
        .put(`/notas/${nota.id}`)
        .send(updateNotaDto)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toEqual(updateNotaDto.title);
      expect(response.body.content).toEqual(updateNotaDto.content);
    });

    it('debería devolver un error 404 si la nota no existe', async () => {
      const updateNotaDto = {
        title: 'Nota actualizada',
        content: 'Contenido actualizado',
      };

      const response = await request(app.getHttpServer())
        .put('/notas/999')
        .send(updateNotaDto)
        .expect(404);

      expect(response.body.message).toContain('Nota con ID 999 no encontrada');
    });
  });
  describe('/notas/:id (DELETE)', () => {
    it('debería eliminar una nota existente', async () => {
      const createNotaDto = {
        title: 'Nota de prueba',
        content: 'Contenido de la nota de prueba',
      };

      const nota = await notaRepository.save(createNotaDto);

      const response = await request(app.getHttpServer())
        .delete(`/notas/${nota.id}`)
        .expect(200);
    });

    it('debería devolver un error 404 si la nota no existe', async () => {
      const response = await request(app.getHttpServer())
        .delete('/notas/999')
        .expect(404);

      expect(response.body.message).toContain('Nota con ID 999 no encontrada');
    });
  });
});
