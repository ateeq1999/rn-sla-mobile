import { RegisterUserInput, LoginUserInput, Partner, User } from "@/types/user";
import { BaseApiResponse, RegisterApiResponse } from "@/types/shared";
import { Api } from "./api";

async function partnerLogin(data: LoginUserInput): Promise<RegisterApiResponse<Partner>> {
    return await Api.post("/auth/partners/login", data);
}

async function partnerRegister(data: RegisterUserInput): Promise<RegisterApiResponse<Partner>> {
    return Api.post("/auth/partners/register", data);
}

async function partnerLogout(): Promise<BaseApiResponse> {
    return Api.post("/auth/partners/logout");
}

async function login(data: LoginUserInput): Promise<RegisterApiResponse<User>> {
    return await Api.post("/auth/users/login", data);
}

async function register(data: RegisterUserInput): Promise<RegisterApiResponse<User>> {
    return Api.post("/auth/users/register", data);
}

async function logout(): Promise<BaseApiResponse> {
    return Api.post("/auth/users/logout");
}

const authService = {
    partnerLogin,
    partnerRegister,
    partnerLogout,
    login,
    register,
    logout,
};

export { authService };