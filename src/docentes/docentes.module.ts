import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegúrate de importar PrismaModule
  controllers: [DocentesController],
  providers: [DocentesService],
})
export class DocentesModule {}