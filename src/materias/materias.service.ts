import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  create(data: { nombre: string }) {
    return this.prisma.materia.create({ data });
  }

  findAll() {
    return this.prisma.materia.findMany();
  }

  findOne(id: number) {
    return this.prisma.materia.findUnique({ where: { id } });
  }

  update(id: number, data: { nombre: string }) {
    return this.prisma.materia.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.materia.delete({ where: { id } });
  }
}
