import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './create-carrera.dto';
import { UpdateCarreraDto } from './update-carrera.dto';
@ApiTags('carreras') 
@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una carrera' })
  @ApiBody({ description: 'Datos de la carrera', type: CreateCarreraDto })
  create(@Body() data: CreateCarreraDto) {
    return this.carrerasService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las carreras' })
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una carrera por ID' })
  @ApiParam({ name: 'id', description: 'ID de la carrera' })
  findOne(@Param('id') id: string) {
    return this.carrerasService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una carrera' })
  @ApiParam({ name: 'id', description: 'ID de la carrera' })
  @ApiBody({ description: 'Datos actualizados de la carrera', type: UpdateCarreraDto })
  update(@Param('id') id: string, @Body() data: UpdateCarreraDto) {
    return this.carrerasService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una carrera' })
  @ApiParam({ name: 'id', description: 'ID de la carrera' })
  remove(@Param('id') id: string) {
    return this.carrerasService.remove(+id);
  }
}
