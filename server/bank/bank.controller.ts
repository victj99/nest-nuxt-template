import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BankService } from './bank.service';
import { BankDTO, BankQueryParams } from './dto/bank.dto';

@ApiTags('bank')
@Controller('bank')
export class BankController {

    constructor(private readonly bankService: BankService) { }

    @Get('search')
    async getAllBy (@Res() res: Response, @Query() query: BankQueryParams) {
        const data = await this.bankService.getAllBy(query);
        res.status(HttpStatus.OK).json(data)
    }

    @Get('search/:id')
    async getOneBy (@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
        const data = await this.bankService.getOneById({ id: id })
        res.status(HttpStatus.OK).json(data)
    }

    @Post('create')
    async create (@Res() res: Response, @Body() dto: BankDTO) {
        const data = await this.bankService.create(dto)
        res.status(HttpStatus.CREATED).json(data)
    }

    @Put('update/:id')
    async update (@Param('id', ParseIntPipe) id: number, @Res() res: Response, @Body() dto: BankDTO) {
        // delete dto.id
        const data = await this.bankService.update(id, dto)
        res.status(HttpStatus.CREATED).json(data)
    }
}
