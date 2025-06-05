import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ConsultasService } from './consultas.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('consultas')
@Controller('consultas')
@UseGuards(RolesGuard)
@Roles('admin', 'docente', 'secretaria')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Get('materias-carreras/:estudianteId')
  @ApiOperation({ summary: 'Listar materias y carrera de un estudiante' })
  @ApiParam({ name: 'estudianteId', description: 'ID del estudiante' })
  materiasYCarreraDeEstudiante(@Param('estudianteId') estudianteId: string) {
    return this.consultasService.materiasYCarreraDeEstudiante(+estudianteId);
  }

  @Get('estudiantes-por-carrera/:carreraId')
  @ApiOperation({ summary: 'Contar estudiantes en una carrera' })
  @ApiParam({ name: 'carreraId', description: 'ID de la carrera' })
  contarEstudiantesPorCarrera(@Param('carreraId') carreraId: string) {
    return this.consultasService.contarEstudiantesPorCarrera(+carreraId);
  }

  @Get('estudiantes-por-materia/:materiaId')
  @ApiOperation({ summary: 'Listar estudiantes por materia' })
  @ApiParam({ name: 'materiaId', description: 'ID de la materia' })
  estudiantesPorMateria(@Param('materiaId') materiaId: string) {
    return this.consultasService.estudiantesPorMateria(+materiaId);
  }

  @Get('docentes-por-materia/:materiaId')
  @ApiOperation({ summary: 'Listar docentes de una materia' })
  @ApiParam({ name: 'materiaId', description: 'ID de la materia' })
  docentesDeMateria(@Param('materiaId') materiaId: string) {
    return this.consultasService.docentesDeMateria(+materiaId);
  }

  @Get('docentes-por-carrera/:carreraId')
  @ApiOperation({ summary: 'Relación docentes - carreras' })
  @ApiParam({ name: 'carreraId', description: 'ID de la carrera' })
  docentesPorCarrera(@Param('carreraId') carreraId: string) {
    return this.consultasService.docentesPorCarrera(+carreraId);
  }

  @Get('materias-completo')
  @ApiOperation({ summary: 'Obtener todas las materias con docentes y conteo de estudiantes' })
  obtenerMateriasCompleto() {
    return this.consultasService.obtenerMateriasCompleto();
  }

  @Get('carreras-completo')
  @ApiOperation({ summary: 'Obtener todas las carreras con estudiantes y docentes' })
  obtenerCarrerasCompleto() {
    return this.consultasService.obtenerCarrerasCompleto();
  }
}
