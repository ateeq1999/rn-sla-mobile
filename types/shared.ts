import {User} from "@/types/user";

export interface Token {
    type: string
    name: string | null
    token: string
    abilities: string[]
    lastUsedAt: number | null
    expiresAt: number | null
}

interface RegisterData {
    token: Token
    partner: User
}

export interface RegisterApiResponse {
    message: string;
    code: number;
    data: RegisterData;
}
