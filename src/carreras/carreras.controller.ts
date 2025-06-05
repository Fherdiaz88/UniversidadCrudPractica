import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './create-carrera.dto';
import { UpdateCarreraDto } from './update-carrera.dto';
import { Roles } from '../auth/roles.decorator';
import { Permissions } from '../auth/permissions.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';


@ApiTags('carreras')
@ApiBearerAuth('access-token')

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)  
  @Roles('admin')
  @Permissions('create_carrera')
  @ApiOperation({ summary: 'Crear una carrera' })
  @ApiBody({ description: 'Datos de la carrera', type: CreateCarreraDto })
  create(@Body() data: CreateCarreraDto) {
    return this.carrerasService.create(data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
@ApiQuery({ name: 'page', required: false })
@ApiQuery({ name: 'limit', required: false })
findAll(
  @Query('page') page?: number,
  @Query('limit') limit?: number,
) {
  return this.carrerasService.findAll(Number(page) || 1, Number(limit) || 10);
}

  @Get(':id')
 @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)

  @Roles('admin', 'docente')
  @Permissions('get_carrera')
  @ApiOperation({ summary: 'Obtener una carrera por ID' })
  @ApiParam({ name: 'id', description: 'ID de la carrera' })
  findOne(@Param('id') id: string) {
    return this.carrerasService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)

  @Roles('admin')
  @Permissions('update_carrera')
  @ApiOperation({ summary: 'Actualizar una carrera' })
  @ApiParam({ name: 'id', description: 'ID de la carrera' })
  @ApiBody({ description: 'Datos actualizados de la carrera', type: UpdateCarreraDto })
  update(@Param('id') id: string, @Body() data: UpdateCarreraDto) {
    return this.carrerasService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)

  @Roles('admin')
  @Permissions('delete_carrera')
  @ApiOperation({ summary: 'Eliminar una carrera' })
  @ApiParam({ name: 'id', description: 'ID de la carrera' })
  remove(@Param('id') id: string) {
    return this.carrerasService.remove(+id);
  }
}
