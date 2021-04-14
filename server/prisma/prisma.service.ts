import { PrismaClient } from '.prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // constructor() {
    //     super({ log: ['lo'] })
    // }

    async onModuleInit () {
        await this.$connect()
    }
    async onModuleDestroy () {
        await this.$disconnect()
    }
}
