import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './create-docente.dto';
import { UpdateDocenteDto } from './update-docente.dto';

@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un docente' })
  @ApiBody({ description: 'Datos del docente', type: CreateDocenteDto })
  create(@Body() data: CreateDocenteDto) {
    return this.docentesService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los docentes' })
  findAll() {
    return this.docentesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un docente por ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  findOne(@Param('id') id: string) {
    return this.docentesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un docente' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiBody({ description: 'Datos actualizados del docente', type: UpdateDocenteDto })
  update(@Param('id') id: string, @Body() data: UpdateDocenteDto) {
    return this.docentesService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un docente' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  remove(@Param('id') id: string) {
    return this.docentesService.remove(+id);
  }
}
