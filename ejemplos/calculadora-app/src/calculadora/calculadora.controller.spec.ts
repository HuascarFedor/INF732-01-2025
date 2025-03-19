import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraController } from './calculadora.controller';
import { CalculadoraService } from './calculadora.service';

describe('CalculadoraController', () => {
  let controller: CalculadoraController;
  let service: CalculadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculadoraController],
      providers: [CalculadoraService],
    }).compile();

    controller = module.get<CalculadoraController>(CalculadoraController);
    service = module.get<CalculadoraService>(CalculadoraService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('deberia sumar dos numeros', () => {
    jest.spyOn(service, 'sumar').mockImplementation((a, b) => a + b);
    expect(controller.sumar(1, 2)).toBe(3);
  });

  it('deberia lanzar error si sumando1 es negativo', () => {
    jest.spyOn(service, 'sumar').mockImplementation(() => {
      throw new Error('No se permiten números negativos');
    });
    expect(() => controller.sumar(-1, 2)).toThrow(
      'No se permiten números negativos',
    );
  });

  it('deberia lanzar error si sumando2 es negativo', () => {
    jest.spyOn(service, 'sumar').mockImplementation(() => {
      throw new Error('No se permiten números negativos');
    });
    expect(() => controller.sumar(1, -2)).toThrow(
      'No se permiten números negativos',
    );
  });
});
