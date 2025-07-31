import { RegisterUserInput, LoginUserInput, Partner, User, MeApiResponse, RegisterApiResponse, BaseApiResponse, LoginApiResponse } from "@/types";
import { Api } from "./api";

async function partnerLogin(data: LoginUserInput): Promise<LoginApiResponse<Partner>> {
    return await Api.post("/auth/partners/login", data);
}

async function partnerRegister(data: RegisterUserInput): Promise<RegisterApiResponse<Partner>> {
    return Api.post("/auth/partners/register", data);
}

async function partnerLogout(): Promise<BaseApiResponse> {
    return Api.post("/auth/partners/logout");
}


async function partnerMe(): Promise<MeApiResponse<Partner>> {
    return Api.post("/auth/partners/me");
}

async function login(data: LoginUserInput): Promise<LoginApiResponse<User>> {
    return await Api.post("/auth/users/login", data);
}

async function register(data: RegisterUserInput): Promise<RegisterApiResponse<User>> {
    return Api.post("/auth/users/register", data);
}

async function logout(): Promise<BaseApiResponse> {
    return Api.post("/auth/users/logout");
}

async function me(): Promise<BaseApiResponse> {
    return Api.post("/auth/users/me");
}

const authService = {
    partnerLogin,
    partnerRegister,
    partnerLogout,
    partnerMe,
    login,
    register,
    logout,
    me,
};

export { authService };