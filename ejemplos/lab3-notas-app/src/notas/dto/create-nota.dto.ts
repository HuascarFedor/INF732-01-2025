import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotaDto {
  @IsString()
  @IsNotEmpty({ message: 'The title is required' })
  @ApiProperty({ example: 'Salir de paseo', description: 'Titulo de la nota' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'The content is required' })
  @ApiProperty({
    example: 'Preparar las cosas para salir de paseo',
    description: 'Descripcion de la nota',
  })
  content: string;
}
