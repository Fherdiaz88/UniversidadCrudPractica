import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma'; // Ajusta la ruta al cliente generado

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super();
    }

    async onModuleInit() {
        await this.$connect(); 
    }

    async onModuleDestroy() {
        await this.$disconnect(); 
    }
}