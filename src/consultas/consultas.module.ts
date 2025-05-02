import { Module } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importa PrismaModule

@Module({
  imports: [PrismaModule], // Asegúrate de importar PrismaModule
  controllers: [ConsultasController],
  providers: [ConsultasService],
})
export class ConsultasModule {}