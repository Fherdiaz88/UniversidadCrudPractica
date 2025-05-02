import { ApiProperty } from '@nestjs/swagger';

export class UpdateEstudianteDto {
  @ApiProperty({ description: 'Nombre actualizado del estudiante', example: 'Josue Romero' })
  nombre: string;

  @ApiProperty({
    description: 'ID de la carrera del estudiante (opcional)',
    example: 1,
    required: false,
  })
  carreraId?: number; 

  @ApiProperty({
    description: 'IDs de las materias que cursa el estudiante (opcional)',
    example: [1, 2],
    required: false,
    type: [Number],
  })
  materiasIds?: number[]; 
}
