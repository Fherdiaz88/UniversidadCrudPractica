import { ApiProperty } from '@nestjs/swagger';

export class UpdateMateriaDto {
  @ApiProperty({ description: 'Nombre actualizado de la materia', example: 'Arquitectura' })
  nombre: string;
}