import { Role } from "./role";

export type User = {
    id: number;
    username: string;
    name: string;
    lastName: string;
    email: string;
    role: Role[]
}