import { type } from "os";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
}

export type NewUserEntry = Omit<User, "id">