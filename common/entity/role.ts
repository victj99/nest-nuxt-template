export type Role = {
    id: number;
    name: string;
}

export const roles: Role[] = [
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'USER' },
    { id: 3, name: 'DEVELOPER' }
]