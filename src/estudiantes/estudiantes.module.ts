import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegúrate de importar PrismaModule
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}