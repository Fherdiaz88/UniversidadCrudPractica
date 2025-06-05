import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarrerasService {
  constructor(private prisma: PrismaService) {}



  create(data: { nombre: string }) {
    return this.prisma.carrera.create({ data });
  }

findAll(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  return this.prisma.carrera.findMany({
    skip,
    take: limit,
  });
}


  findOne(id: number) {
    return this.prisma.carrera.findUnique({ where: { id } });
  }

  update(id: number, data: { nombre: string }) {
    return this.prisma.carrera.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.carrera.delete({ where: { id } });
  }
}
