import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [], // Asegúrate de importar PrismaModule
  controllers: [MateriasController],
  providers: [MateriasService, PrismaService],
})
export class MateriasModule {}