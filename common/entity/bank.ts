import { QueryParams } from "@common/rest";

export interface Bank {
    id?: number
    address: string
    name: string
    accountNumber?: string
    swift?: string
}

export interface BankQuery extends QueryParams {
    address?: string
    name?: string
    accountNumber?: string
    swift?: string
}
