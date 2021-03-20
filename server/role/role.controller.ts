import { Role } from '.prisma/client';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService) { }
    @Get(':id')
    async getAllBy(@Param('id', ParseIntPipe) id: number): Promise<Role> {
        return this.roleService.role({ id: id });
    }
}
