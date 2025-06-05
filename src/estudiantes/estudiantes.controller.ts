import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './create-estudiante.dto';
import { UpdateEstudianteDto } from './update-estudiante.dto';
import { Roles } from '../auth/roles.decorator';
import { Permissions } from '../auth/permissions.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth('access-token')
@ApiTags('estudiantes')
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles('admin', 'secretaria')
  @Permissions('create_estudiante')
  @ApiOperation({ summary: 'Crear un estudiante' })
  @ApiBody({ description: 'Datos del estudiante', type: CreateEstudianteDto })
  create(@Body() data: CreateEstudianteDto) {
    return this.estudiantesService.create(data);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'docente', 'secretaria')
  @Permissions('get_estudiante')
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'docente', 'secretaria')
  @Permissions('get_estudiante')
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiParam({ name: 'id', description: 'ID del estudiante' })
  findOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('update_estudiante')
  @ApiOperation({ summary: 'Actualizar un estudiante' })
  @ApiParam({ name: 'id', description: 'ID del estudiante' })
  @ApiBody({ description: 'Datos actualizados del estudiante', type: UpdateEstudianteDto })
  update(@Param('id') id: string, @Body() data: UpdateEstudianteDto) {
    return this.estudiantesService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('delete_estudiante')
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  @ApiParam({ name: 'id', description: 'ID del estudiante' })
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(+id);
  }
}
