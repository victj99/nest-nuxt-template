import { Body, Controller, Get, HttpStatus, Put, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CompanyService } from './company.service';
import { CompanyDTO } from './dto/company.dto';

@Controller('company')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) { }

    @Get('search')
    async getOneBy (@Res() res: Response) {
        const data = await this.companyService.getCompany()
        res.status(HttpStatus.OK).json(data)
    }

    @Put('update')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'logo', maxCount: 1 },
        { name: 'stamp', maxCount: 1 }
    ]))
    async update (@Res() res: Response, @UploadedFiles() files, @Body() dto: CompanyDTO) {
        await this.companyService.update(dto, files)
        res.status(HttpStatus.CREATED).json('ok')
    }
}
