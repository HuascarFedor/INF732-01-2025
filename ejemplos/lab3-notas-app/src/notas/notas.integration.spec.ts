import { Repository } from 'typeorm';
import { NotasService } from './notas.service';
import { Nota } from './nota.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('Notas Integration Tests', () => {
  let service: NotasService;
  let repository: Repository<Nota>;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'notas_test',
          entities: [Nota],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Nota]),
      ],
      providers: [NotasService],
    }).compile();
    service = module.get<NotasService>(NotasService);
    repository = module.get<Repository<Nota>>(getRepositoryToken(Nota));
  });

  afterAll(async () => {
    const connection = repository.manager.connection;
    if (connection.isInitialized) {
      await connection.destroy();
    }
  });

  afterEach(async () => {
    await repository.query('DELETE FROM nota;');
  });

});
