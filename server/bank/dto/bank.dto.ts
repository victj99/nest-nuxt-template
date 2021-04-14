import { Bank, BankQuery } from "@common/entity/bank";
import { Exclude } from "class-transformer";
import { IsNumber } from "class-validator";

export class BankDTO implements Bank {
    @Exclude({ toPlainOnly: true })
    id?: number

    address: string;
    name: string;
    accountNumber?: string;
    swift?: string;

}

export class BankQueryParams implements BankQuery {
    address?: string;
    name?: string;
    accountNumber?: string;
    swift?: string;
    page?: number;

    @IsNumber()
    size: number;
}