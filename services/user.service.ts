import {RegisterUserInput, LoginUserInput} from "@/types/user";
import {RegisterApiResponse} from "@/types/shared";
import { Api } from "./api";

async function login(data: LoginUserInput): Promise<RegisterApiResponse> {
    return await Api.post("/auth/partners/login", data);
}

async function register(data: RegisterUserInput): Promise<RegisterApiResponse> {
    return Api.post("/auth/partners/register", data);
}

const userService = {
    login,
    register,
};

export { userService };