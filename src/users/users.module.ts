import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController], // 👈 ¡IMPORTANTE!
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
