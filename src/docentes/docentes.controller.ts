import {Controller,Get,Post,Body,Param,Put,Delete,UseGuards,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiParam,ApiBody,} from '@nestjs/swagger';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './create-docente.dto';
import { UpdateDocenteDto } from './update-docente.dto';
import { Roles } from '../auth/roles.decorator';
import { Permissions } from '../auth/permissions.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin', 'coordinador')
  @Permissions('create_docente')
  @ApiOperation({ summary: 'Crear un docente' })
  @ApiBody({ description: 'Datos del docente', type: CreateDocenteDto })
  create(@Body() data: CreateDocenteDto) {
    return this.docentesService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'docente')
   @Permissions('get_docente')
  @ApiOperation({ summary: 'Obtener todos los docentes' })
  findAll() {
    return this.docentesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'docente')
   @Permissions('get_docente')
  @ApiOperation({ summary: 'Obtener un docente por ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  findOne(@Param('id') id: string) {
    return this.docentesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('update_docente')
  @ApiOperation({ summary: 'Actualizar un docente' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiBody({ description: 'Datos actualizados del docente', type: UpdateDocenteDto })
  update(@Param('id') id: string, @Body() data: UpdateDocenteDto) {
    return this.docentesService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('delete_docente')
  @ApiOperation({ summary: 'Eliminar un docente' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  remove(@Param('id') id: string) {
    return this.docentesService.remove(+id);
  }
}
