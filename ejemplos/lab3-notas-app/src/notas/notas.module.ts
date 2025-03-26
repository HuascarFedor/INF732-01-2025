import { Module } from '@nestjs/common';
import { NotaService } from './notas.service';
import { NotaController } from './notas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './notas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nota])],
  providers: [NotaService],
  controllers: [NotaController],
})
export class NotaModule {}
