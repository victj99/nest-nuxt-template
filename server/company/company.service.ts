import { Company } from '@common/entity/company';
import { Injectable } from '@nestjs/common';
import { COMPANY_DATA_ROUTE, LOGO_ROUTE, STAMP_ROUTE } from '@server/common/constants';
import { plainToClass } from 'class-transformer';
import { outputFile, outputJSON, pathExists, readJSON, writeJSON } from "fs-extra";
import { extname } from 'path';
import { CompanyDTO } from './dto/company.dto';

@Injectable()
export class CompanyService {
    async getCompany (): Promise<CompanyDTO> {

        try {
            let company: Company = { ruc: "", name: "NoName", email: "", phone: "", address: "" }

            const exists = await pathExists(COMPANY_DATA_ROUTE)
            if (!exists) await outputJSON(COMPANY_DATA_ROUTE, company, { encoding: 'utf-8', spaces: 2 })

            company = await readJSON(COMPANY_DATA_ROUTE, { throws: false })

            // if (await pathExists(LOGO_ROUTE + company.logo))
            // company.logo = await readFile(LOGO_ROUTE + company.logo)

            return plainToClass(CompanyDTO, company)
        } catch (error) {
            throw new Error(error)
        }
    }

    async update (dto: CompanyDTO, files) {
        try {
            if (files.logo) {
                dto.logo = extname(files.logo[0].originalname)
                await outputFile(LOGO_ROUTE + extname(files.logo[0].originalname), files.logo[0].buffer)
            }

            if (files.stamp) {
                dto.stamp = extname(files.stamp[0].originalname)
                await outputFile(STAMP_ROUTE + extname(files.stamp[0].originalname), files.stamp[0].buffer)
            }

            await writeJSON(COMPANY_DATA_ROUTE, dto, { encoding: 'utf-8', spaces: 2 })
            return
        } catch (error) {
            throw new Error(error)
        }

    }
}
