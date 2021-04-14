export interface QueryParams {
    page?: number
    size: number
}

export type DataTableParams = {
    items: []
    total: number
}

export type Payload<Type = any> = {
    url: string
    params?: QueryParams
    item?: Type
    id?: number
}