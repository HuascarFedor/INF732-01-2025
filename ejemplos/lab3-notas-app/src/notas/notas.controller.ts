import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NotasService } from './notas.service';
import { Nota } from './nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notas')
@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Nota creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiOperation({
    summary: 'Crear una nota',
    description: 'Este endpoint crea una nueva nota en el sistema.',
  })
  @ApiBody({ type: CreateNotaDto })
  async create(@Body() createNotaDto: CreateNotaDto): Promise<Nota> {
    return this.notasService.create(createNotaDto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Nota ha sido encontrada' })
  @ApiResponse({ status: 404, description: 'La nota no existe en el sistema' })
  @ApiOperation({
    summary: 'Encontrar una nota',
    description: 'Este endpoint permite encontrar una nota en el sistema.',
  })
  @ApiParam({ name: 'id', description: 'ID de la nota' })
  async findOne(@Param('id') id: string): Promise<Nota> {
    return this.notasService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<Nota[]> {
    return this.notasService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNotaDto: UpdateNotaDto,
  ): Promise<Nota> {
    return this.notasService.update(+id, updateNotaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.notasService.remove(+id);
  }

  @Get('search/:title')
  async findByTitle(@Param('title') title: string): Promise<Nota[]> {
    return this.notasService.findByTitle(title);
  }
}
