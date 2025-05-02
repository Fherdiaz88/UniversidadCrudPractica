import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocentesService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un Docente con Carrera y Materias
  create(data: { nombre: string; carreraId: number; materiasIds: number[] }) {
    return this.prisma.docente.create({
      data: {
        nombre: data.nombre,
        docentesCarrera: {
          create: {
            carrera: { connect: { id: data.carreraId } }, // Conecta al Docente con una Carrera por su ID
          },
        },
        dictan: {
          create: data.materiasIds.map(materiaId => ({
            materia: { connect: { id: materiaId } }, // Conecta las materias que el docente dicta
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.docente.findMany();
  }

  findOne(id: number) {
    return this.prisma.docente.findUnique({
      where: { id },
      include: {
        docentesCarrera: { include: { carrera: true } },
        dictan: { include: { materia: true } },
      },
    });
  }

  update(id: number, data: { nombre: string; carreraId?: number; materiasIds?: number[] }) {
    return this.prisma.docente.update({
      where: { id },
      data: {
        nombre: data.nombre,
        docentesCarrera: data.carreraId
          ? {
              create: {
                carrera: { connect: { id: data.carreraId } },
              },
            }
          : undefined,
        dictan: data.materiasIds
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
    return this.prisma.docente.delete({ where: { id } });
  }
}
