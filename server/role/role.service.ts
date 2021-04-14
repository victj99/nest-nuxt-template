import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { Role, Prisma } from '@prisma/client'

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async getAllBy(roleWhereUniqueInput: Prisma.RoleWhereUniqueInput): Promise<Role | null> {
        return this.prisma.role.findUnique({ where: roleWhereUniqueInput });
    }

    async getOneById(roleWhereUniqueInput: Prisma.RoleWhereUniqueInput): Promise<Role | null> {
        return this.prisma.role.findUnique({ where: roleWhereUniqueInput });
    }
}
