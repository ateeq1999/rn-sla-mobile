export interface Token {
    type: string
    name: string | null
    token: string
    abilities: string[]
    lastUsedAt: number | null
    expiresAt: number | null
}

interface Meta {
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

interface AuthData<T> {
    token: Token
    partner: T
}

interface ApiData<T> {
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

export interface LoginApiResponse<T> extends BaseApiResponse {
    data: AuthData<T>;
}

export interface ListApiResponse<T> extends BaseApiResponse {
    data: ApiData<T>;
}

export interface SingleApiResponse<T> extends BaseApiResponse {
    data: ApiData<T>;
}
