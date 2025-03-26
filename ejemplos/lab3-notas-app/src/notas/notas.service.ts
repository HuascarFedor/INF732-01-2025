import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nota } from './notas.entity';
import { Repository } from 'typeorm';
import { CreateNotaDto } from './dto/create-nota.dto';

@Injectable()
export class NotaService {
  constructor(
    @InjectRepository(Nota)
    private notasRepository: Repository<Nota>,
  ) {}

  create(createNotaDto: CreateNotaDto): Promise<Nota> {
    const newNota = this.notasRepository.create(createNotaDto);
    return this.notasRepository.save(newNota);
  }

  findAll(): Promise<Nota[]> {
    return this.notasRepository.find();
  }
}
