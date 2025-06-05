import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async create(data: { username: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async assignRoleToUser(userId: number, roleId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          connect: { id: roleId },
        },
      },
      include: { roles: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }
}
