import { Test, TestingModule } from '@nestjs/testing';
import { NotaService } from './notas.service';

describe('NotaService', () => {
  let service: NotaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaService],
    }).compile();

    service = module.get<NotaService>(NotaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
