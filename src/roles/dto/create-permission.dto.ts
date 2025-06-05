import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Lista de nombres de permisos',
    type: [String],
    example: [
      'create_carrera',
      'get_carrera',
      'update_carrera'
    ]
  })
  @IsArray()
  @IsString({ each: true })
  name: string[];
}
