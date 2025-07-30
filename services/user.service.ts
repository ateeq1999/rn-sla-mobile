import { RegisterUserInput, LoginUserInput, Partner } from "@/types/user";
import { Api } from "./api";
import { ListApiResponse, SingleApiResponse } from "@/types/shared";

async function index(data: LoginUserInput): Promise<ListApiResponse<Partner>> {
    return await Api.get("/partners");
}

async function get(id: string): Promise<SingleApiResponse<Partner>> {
    return await Api.get(`/partners/${id}`);
}

const userService = {
    index,
    get,
};

export { userService };