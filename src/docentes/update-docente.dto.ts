import { ApiProperty } from '@nestjs/swagger';

export class UpdateDocenteDto {
  @ApiProperty({ description: 'Nombre actualizado del docente', example: 'Mateo Lituma' })
  nombre: string;

  @ApiProperty({
    description: 'ID de la carrera que dicta el docente (opcional)',
    example: 1,
    required: false,
  })
  carreraId?: number; 

  @ApiProperty({
    description: 'IDs de las materias que dicta el docente (opcional)',
    example: [1, 2],
    required: false,
    type: [Number],
  })
  materiasIds?: number[]; 
}
