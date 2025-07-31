export interface Token {
    type: string
    name: string | null
    token: string
    abilities: string[]
    lastUsedAt: number | null
    expiresAt: number | null
}

export interface Meta {
    total: number,
    perPage: number,
    currentPage: number,
    lastPage: number,
    firstPage: number,
    firstPageUrl: string | null,
    lastPageUrl: string | null,
    nextPageUrl: string | null,
    previousPageUrl: string | null,
}

export interface AuthData<T> {
    token: Token
    partner: T
}

export interface MeData<T> {
    partner: T
}

export interface ApiData<T> {
    meta: Meta
    data: Array<T>
}

export interface RegisterApiResponse<T> extends BaseApiResponse {
    data: AuthData<T>;
}

export interface BaseApiResponse {
    message: string;
    code: number;
}
