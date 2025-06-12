import { ApiProperty } from '@nestjs/swagger';

export class CreateEstudianteDto {
  @ApiProperty({ description: 'Nombre del estudiante', example: 'Zambranin sebas' })
  nombre: string;

  @ApiProperty({ description: 'ID de la carrera del estudiante', example: 1 })
  carreraId: number; 

  @ApiProperty({ 
    description: 'IDs de las materias que cursa el estudiante', 
    example: [1, 2], 
    type: [Number] 
  })
  materiasIds: number[]; 
}
