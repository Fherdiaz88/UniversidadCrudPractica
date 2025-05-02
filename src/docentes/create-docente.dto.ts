import { ApiProperty } from '@nestjs/swagger';

export class CreateDocenteDto {
  @ApiProperty({ description: 'Nombre del docente', example: 'Miguel zuñiga' })
  nombre: string;

  @ApiProperty({ description: 'ID de la carrera que dicta el docente', example: 1 })
  carreraId: number; 

  @ApiProperty({
    description: 'IDs de las materias que dicta el docente',
    example: [1, 2],
    type: [Number],
  })
  materiasIds: number[]; 
}
