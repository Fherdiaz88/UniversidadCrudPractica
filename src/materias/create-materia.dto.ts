import { ApiProperty } from '@nestjs/swagger';

export class CreateMateriaDto {
  @ApiProperty({ description: 'Nombre de la materia', example: 'Ingenieria' })
  nombre: string;
}