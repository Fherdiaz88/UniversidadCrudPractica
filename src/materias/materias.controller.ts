import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { MateriasService } from './materias.service';
import { CreateMateriaDto } from './create-materia.dto';
import { UpdateMateriaDto } from './update-materia.dto';
import { Roles } from '../auth/roles.decorator';
import { Permissions } from '../auth/permissions.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('materias')
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)  
  @Roles('admin')
  @Permissions('create_materia')
  @ApiOperation({ summary: 'Crear una materia' })
  @ApiBody({ description: 'Datos de la materia', type: CreateMateriaDto })
  create(@Body() data: CreateMateriaDto) {
    return this.materiasService.create(data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)  
  @Roles('admin', 'docente')
  @Permissions('get_materia')
  @ApiOperation({ summary: 'Obtener todas las materias' })
  findAll() {
    return this.materiasService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)  
  @Roles('admin', 'docente')
  @Permissions('get_materia')
  @ApiOperation({ summary: 'Obtener una materia por ID' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Put(':id')
 @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)  
  @Roles('admin')
  @Permissions('update_materia')
  @ApiOperation({ summary: 'Actualizar una materia' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  @ApiBody({ description: 'Datos actualizados de la materia', type: UpdateMateriaDto })
  update(@Param('id') id: string, @Body() data: UpdateMateriaDto) {
    return this.materiasService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)  
  @Roles('admin')
  @Permissions('delete_materia')
  @ApiOperation({ summary: 'Eliminar una materia' })
  @ApiParam({ name: 'id', description: 'ID de la materia' })
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
}
