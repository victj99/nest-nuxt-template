import { Company } from "@common/entity/company";

export class CompanyDTO implements Company {
    ruc: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo?: any
    stamp?: any
}