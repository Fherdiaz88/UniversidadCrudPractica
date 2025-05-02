import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './create-materia.dto';
import { UpdateMateriaDto } from './update-materia.dto';

@ApiTags('materias') 
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una materia' })
  @ApiBody({ description: 'Datos de la materia', type: CreateMateriaDto })
  create(@Body() data: CreateMateriaDto) {
    return this.materiasService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las materias' })
  findAll() {
    return this.materiasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una materia por ID' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una materia' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  @ApiBody({ description: 'Datos actualizados de la materia', type: UpdateMateriaDto })
  update(@Param('id') id: string, @Body() data: UpdateMateriaDto) {
    return this.materiasService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una materia' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
}