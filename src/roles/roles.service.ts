import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  createRole(name: string) {
    return this.prisma.role.create({
      data: { name },
    });
  }

  async createPermission(names: string[]) {
    const createdPermissions = [];

    for (const name of names) {
      const permission = await this.prisma.permission.create({
        data: { name },
      });
      createdPermissions.push(permission);
    }

    return createdPermissions;
  }

async assignPermissionsToRole(roleId: number, permissionIds: number[]) {
  // Validar que el rol existe
  const role = await this.prisma.role.findUnique({ where: { id: roleId } });
  if (!role) {
    throw new Error(`Role with id ${roleId} does not exist`);
  }

  // Filtrar IDs válidos
  const validPermissionIds = permissionIds.filter(id => Number.isInteger(id) && id > 0);

  if (validPermissionIds.length === 0) {
    throw new Error('No valid permission IDs provided');
  }

  return this.prisma.role.update({
    where: { id: roleId },
    data: {
      permissions: {
        connect: validPermissionIds.map(id => ({ id })),
      },
    },
  });
}


  findAllRoles() {
    return this.prisma.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  findAllPermissions() {
    return this.prisma.permission.findMany();
  }
}
