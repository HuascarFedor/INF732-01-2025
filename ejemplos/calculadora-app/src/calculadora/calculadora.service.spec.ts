import { Test, TestingModule } from '@nestjs/testing';
import { CalculadoraService } from './calculadora.service';

describe('CalculadoraService', () => {
  let service: CalculadoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculadoraService],
    }).compile();

    service = module.get<CalculadoraService>(CalculadoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sumar 1 + 2 resulta 3', () => {
    expect(service.sumar(1, 2)).toBe(3);
  });

  it('lanza error si sumando1 es negativo', () => {
    expect(() => service.sumar(-1, 2)).toThrow(
      'No se permiten números negativos',
    );
  });

  it('lanza error si sumando2 es negativo', () => {
    expect(() => service.sumar(1, -2)).toThrow(
      'No se permiten números negativos',
    );
  });
});
