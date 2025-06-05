import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RolesController], // 👈 NECESARIO
  providers: [RolesService, PrismaService],
})
export class RolesModule {}
