import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { UpdateEstudianteDto } from './update-estudiante.dto';

@ApiTags('estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un estudiante' })
  @ApiBody({ description: 'Datos del estudiante', type: CreateEstudianteDto })
  create(@Body() data: CreateEstudianteDto) {
    return this.estudiantesService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiParam({ name: 'id', description: 'ID del estudiante' })
  findOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un estudiante' })
  @ApiParam({ name: 'id', description: 'ID del estudiante' })
  @ApiBody({ description: 'Datos actualizados del estudiante', type: UpdateEstudianteDto })
  update(@Param('id') id: string, @Body() data: UpdateEstudianteDto) {
    return this.estudiantesService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  @ApiParam({ name: 'id', description: 'ID del estudiante' })
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(+id);
  }
}
