import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientException } from '@server/prisma/prisma.exception';
import { PrismaService } from '@server/prisma/prisma.service';
import { classToPlain, plainToClass } from 'class-transformer';
import { BankDTO, BankQueryParams } from './dto/bank.dto';

@Injectable()
export class BankService {
    select: Prisma.BankSelect = { id: true, accountNumber: true, address: true, name: true, swift: true }

    constructor(private prisma: PrismaService) { }

    async getAllBy (args: BankQueryParams) {
        const where: Prisma.BankWhereInput = {}
        if (args.name !== undefined) where.name = { contains: args.name }
        if (args.accountNumber !== undefined) where.accountNumber = { startsWith: args.accountNumber }
        if (args.address !== undefined) where.address = { contains: args.address }
        if (args.swift !== undefined) where.swift = { startsWith: args.swift }

        try {
            const [items, total] = await this.prisma.$transaction([
                this.prisma.bank.findMany({ where: where, orderBy: { id: 'asc' }, select: this.select, take: args.size }),
                this.prisma.bank.count()
            ])
            return { items, total }
        } catch (error) {
            throw new PrismaClientException(error)
        }
    }

    async getOneById (bankWhereUniqueInput: Prisma.BankWhereUniqueInput): Promise<BankDTO> {
        try {
            const item = await this.prisma.bank.findUnique({
                where: bankWhereUniqueInput, select: this.select
            })
            if (item === null)
                throw new NotFoundException('El elemento no existe')

            return plainToClass(BankDTO, item)
        } catch (error) {
            throw new PrismaClientException(error)
        }
    }
    async create (dto: BankDTO) {
        const data = dto as Prisma.BankCreateInput
        data.createdByUser = { connect: { id: 1 } }
        data.updatedByUser = { connect: { id: 1 } }

        try {
            const item = await this.prisma.bank.create({ data })
            return item.id
        } catch (error) {
            throw new PrismaClientException(error)
        }

    }

    async update (id: number, dto: BankDTO) {
        const data: Prisma.BankUpdateInput = classToPlain(dto, {})
        data.updatedByUser = { connect: { id: 1 } }

        try {
            const item = await this.prisma.bank.update({ data, where: { id: id } })
            return item.id
        } catch (error) {
            throw new PrismaClientException(error)
        }

    }
}
