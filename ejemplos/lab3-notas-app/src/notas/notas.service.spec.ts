import { Test, TestingModule } from '@nestjs/testing';
import { NotaService } from './notas.service';
import { ObjectLiteral, Repository } from 'typeorm';
import { Nota } from './notas.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockNotaRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});

const mockNota = {
  id: 1,
  title: 'Test Nota',
  content: 'Test Content',
};

type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

describe('NotaService', () => {
  let service: NotaService;
  let repository: MockRepository<Nota>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotaService,
        {
          provide: getRepositoryToken(Nota),
          useValue: mockNotaRepository(),
        },
      ],
    }).compile();

    service = module.get<NotaService>(NotaService);
    repository = module.get<MockRepository<Nota>>(getRepositoryToken(Nota));
  });

  it('deberia crear una nota', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(mockNota as Nota);

    const result = await service.create({
      title: 'Test Nota',
      content: 'Test Content',
    });

    expect(result).toEqual(mockNota);

    expect(repository.save).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalled();
  });
});
