  import { Injectable } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { PaginationDto } from '../common/dto/pagination.dto';

  @Injectable()
  export class EstudiantesService {
    constructor(private prisma: PrismaService) {}

    // Crear un Estudiante con Carrera y Materias
    create(data: { nombre: string; carreraId: number; materiasIds: number[] }) {
      return this.prisma.estudiante.create({
        data: {
          nombre: data.nombre,
          carrera: {
            connect: { id: data.carreraId }, // Conecta al Estudiante con una Carrera por su ID
          },
          inscripciones: {
            create: data.materiasIds.map(materiaId => ({
              materia: { connect: { id: materiaId } }, // Conecta las materias que el estudiante cursa
            })),
          },
        },
      });
    }

    findAll() {
      return this.prisma.estudiante.findMany();
    }

    findOne(id: number) {
      return this.prisma.estudiante.findUnique({
        where: { id },
        include: { carrera: true, inscripciones: { include: { materia: true } } }, // Incluye la carrera y las materias
      });
    }

    update(id: number, data: { nombre: string; carreraId?: number; materiasIds?: number[] }) {
      return this.prisma.estudiante.update({
        where: { id },
        data: {
          nombre: data.nombre,
          carrera: data.carreraId ? { connect: { id: data.carreraId } } : undefined,
          inscripciones: data.materiasIds
            ? {
                create: data.materiasIds.map(materiaId => ({
                  materia: { connect: { id: materiaId } },
                })),
              }
            : undefined,
        },
      });
    }

    remove(id: number) {
      return this.prisma.estudiante.delete({ where: { id } });
    }

   async findPaginated(paginationDto: PaginationDto) {
  const { limit = 10, offset = 0 } = paginationDto;

  const [data, total] = await Promise.all([
    this.prisma.estudiante.findMany({
      skip: offset,
      take: limit,
      include: {
        carrera: true,
        inscripciones: {
          include: {
            materia: true,
          },
        },
      },
    }),
    this.prisma.estudiante.count(),
  ]);

  return {
    total,
    data,
  };
}
  

  }
