import { Role } from '.prisma/client';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService) { }

    // @Get('buscar')
    // async getAllBy(@Query() query): Promise<Role> {
    //     return this.roleService.getAllBy({ id: id });
    // }
    @Get('search/:id')
    async getOneBy (@Param('id', ParseIntPipe) id: number): Promise<Role> {
        return this.roleService.getOneById({ id: id });
    }
}
