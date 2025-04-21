import { Test, TestingModule } from '@nestjs/testing';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';
import { NotFoundException } from '@nestjs/common';
import { Nota } from './nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';

describe('NotasController', () => {
  let controller: NotasController;
  let service: NotasService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotasController],
      providers: [
        {
          provide: NotasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<NotasController>(NotasController);
    service = module.get<NotasService>(NotasService);

    // Limpiar los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deberia crear una nota', async () => {
      const mockNota: Nota = {
        id: 1,
        title: 'Nota 1',
        content: 'Contenido',
      };
      const createNotaDto: CreateNotaDto = {
        title: 'Nota 1',
        content: 'Contenido',
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockNota);
      const result = await controller.create(createNotaDto);
      expect(result).toEqual(mockNota);
      expect(service.create).toHaveBeenCalledWith(createNotaDto);
    });
  });

  describe('findall', () => {
    it('deberia retornar todas las notas', async () => {
      const mockNotas: Nota[] = [
        { id: 1, title: 'Nota 1', content: 'Contenido 1' },
        { id: 2, title: 'Nota 2', content: 'Contenido 2' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockNotas);
      const result = await controller.findAll();
      expect(result).toEqual(mockNotas);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deberia retornar una nota por id', async () => {
      const mockNota: Nota = {
        id: 1,
        title: 'Nota 1',
        content: 'Contenido',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockNota);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockNota);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
    it('deberia lanzar NotFoundException si no se encuentra la nota', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });
});
