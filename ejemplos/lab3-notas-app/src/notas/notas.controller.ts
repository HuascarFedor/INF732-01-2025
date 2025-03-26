import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotaService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { Nota } from './notas.entity';

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post()
  async create(@Body() CreateNotaDto: CreateNotaDto) {
    return await this.notaService.create(CreateNotaDto);
  }

  @Get()
  async findAll(): Promise<Nota[]> {
    return await this.notaService.findAll();
  }
}
