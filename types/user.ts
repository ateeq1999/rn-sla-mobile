export interface ModelAttributes {
    id: string
    createdAt: string
    updatedAt: string
}

export interface User extends ModelAttributes {
    name: string;
    email: string;
    password: string;
}

export interface Partner extends User {
    qrcode: string | null,
    location: string | null,
    type: string | null,
    description: string | null,
    discount: number | null,
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface RegisterUserInput {
    name: string;
    email: string;
    password: string;
    password_confirmation: string
}
